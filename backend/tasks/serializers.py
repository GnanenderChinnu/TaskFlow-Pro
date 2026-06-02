from rest_framework import serializers

from projects.models import Category, Project
from projects.serializers import CategorySerializer, ProjectSerializer
from .models import Reminder, SubTask, Task, TaskActivity


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ("id", "task", "title", "is_completed", "created_at")
        read_only_fields = ("id", "created_at")
        extra_kwargs = {"task": {"required": False}}

    def validate_task(self, task):
        if task and task.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid task.")
        return task


class TaskActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskActivity
        fields = ("id", "task", "action", "metadata", "created_at")
        read_only_fields = ("id", "created_at")


class TaskSerializer(serializers.ModelSerializer):
    project_detail = ProjectSerializer(source="project", read_only=True)
    category_detail = CategorySerializer(source="category", read_only=True)
    subtasks = SubTaskSerializer(many=True, read_only=True)
    completed_subtasks = serializers.IntegerField(read_only=True)
    total_subtasks = serializers.IntegerField(read_only=True)

    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "description",
            "project",
            "project_detail",
            "category",
            "category_detail",
            "priority",
            "status",
            "task_type",
            "due_date",
            "due_time",
            "is_completed",
            "subtasks",
            "completed_subtasks",
            "total_subtasks",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_project(self, project):
        if project and project.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid project.")
        return project

    def validate_category(self, category):
        if category and category.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid category.")
        return category

    def validate(self, attrs):
        if attrs.get("is_completed") or attrs.get("status") == Task.Status.DONE:
            attrs["status"] = Task.Status.DONE
            attrs["is_completed"] = True
        return attrs


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ("id", "task", "remind_at", "message", "is_sent", "created_at")
        read_only_fields = ("id", "is_sent", "created_at")

    def validate_task(self, task):
        if task.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid task.")
        return task
