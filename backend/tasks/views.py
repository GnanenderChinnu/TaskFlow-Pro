import csv

from django.db.models import Count, Q
from django.http import HttpResponse
from rest_framework import decorators, response, status, viewsets

from .filters import TaskFilter
from .models import Reminder, SubTask, Task, TaskActivity
from .serializers import ReminderSerializer, SubTaskSerializer, TaskActivitySerializer, TaskSerializer


def record_activity(task, user, action, metadata=None):
    TaskActivity.objects.create(task=task, user=user, action=action, metadata=metadata or {})


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filterset_class = TaskFilter
    search_fields = ("title", "description", "project__name", "category__name")
    ordering_fields = ("due_date", "due_time", "created_at", "updated_at", "priority")

    def get_queryset(self):
        return (
            Task.objects.filter(user=self.request.user)
            .select_related("project", "category")
            .prefetch_related("subtasks")
            .annotate(
                total_subtasks=Count("subtasks"),
                completed_subtasks=Count("subtasks", filter=Q(subtasks__is_completed=True)),
            )
        )

    def perform_create(self, serializer):
        task = serializer.save(user=self.request.user)
        record_activity(task, self.request.user, "Task created")

    def perform_update(self, serializer):
        before = self.get_object()
        old_status = before.status
        old_completed = before.is_completed
        task = serializer.save()
        changes = {}
        if old_status != task.status:
            changes["status"] = {"from": old_status, "to": task.status}
        if old_completed != task.is_completed:
            changes["is_completed"] = {"from": old_completed, "to": task.is_completed}
        record_activity(task, self.request.user, "Task updated", changes)

    @decorators.action(detail=True, methods=["patch"])
    def complete(self, request, pk=None):
        task = self.get_object()
        is_completed = request.data.get("is_completed", not task.is_completed)
        task.is_completed = bool(is_completed)
        task.status = Task.Status.DONE if task.is_completed else Task.Status.TODO
        task.save(update_fields=["is_completed", "status", "updated_at"])
        record_activity(task, request.user, "Completion toggled", {"is_completed": task.is_completed})
        return response.Response(self.get_serializer(task).data)

    @decorators.action(detail=True, methods=["patch"])
    def status(self, request, pk=None):
        task = self.get_object()
        new_status = request.data.get("status")
        if new_status not in Task.Status.values:
            return response.Response({"status": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)
        old_status = task.status
        task.status = new_status
        task.is_completed = new_status == Task.Status.DONE
        task.save(update_fields=["status", "is_completed", "updated_at"])
        record_activity(task, request.user, "Status changed", {"from": old_status, "to": new_status})
        return response.Response(self.get_serializer(task).data)

    @decorators.action(detail=False, methods=["get"], url_path="export/csv")
    def export_csv(self, request):
        tasks = self.filter_queryset(self.get_queryset())
        output = HttpResponse(content_type="text/csv")
        output["Content-Disposition"] = 'attachment; filename="taskflow_tasks.csv"'
        writer = csv.writer(output)
        writer.writerow(["Title", "Project", "Category", "Priority", "Status", "Type", "Due Date", "Due Time", "Completed"])
        for task in tasks:
            writer.writerow([
                task.title,
                task.project.name if task.project else "",
                task.category.name if task.category else "",
                task.priority,
                task.status,
                task.task_type,
                task.due_date or "",
                task.due_time or "",
                task.is_completed,
            ])
        return output


class SubTaskViewSet(viewsets.ModelViewSet):
    serializer_class = SubTaskSerializer

    def get_queryset(self):
        queryset = SubTask.objects.filter(task__user=self.request.user).select_related("task")
        task_pk = self.kwargs.get("task_pk")
        if task_pk:
            queryset = queryset.filter(task_id=task_pk)
        return queryset

    def perform_create(self, serializer):
        task_id = self.kwargs.get("task_pk")
        task = Task.objects.get(pk=task_id, user=self.request.user) if task_id else serializer.validated_data["task"]
        subtask = serializer.save(task=task)
        record_activity(subtask.task, self.request.user, "Subtask added", {"subtask": subtask.title})

    @decorators.action(detail=True, methods=["patch"])
    def complete(self, request, pk=None):
        subtask = self.get_object()
        subtask.is_completed = bool(request.data.get("is_completed", not subtask.is_completed))
        subtask.save(update_fields=["is_completed"])
        record_activity(subtask.task, request.user, "Subtask toggled", {"subtask": subtask.title})
        return response.Response(self.get_serializer(subtask).data)


class TaskActivityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TaskActivitySerializer

    def get_queryset(self):
        return TaskActivity.objects.filter(user=self.request.user).select_related("task")


class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user).select_related("task")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
