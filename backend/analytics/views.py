from django.db.models import Count
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task


class DashboardStatsView(APIView):
    def get(self, request):
        today = timezone.localdate()
        qs = Task.objects.filter(user=request.user)
        total = qs.count()
        completed = qs.filter(is_completed=True).count()
        overdue = qs.filter(is_completed=False, due_date__lt=today).count()
        pending = total - completed
        productivity = round((completed / total) * 100, 1) if total else 0
        return Response(
            {
                "total_tasks": total,
                "completed_tasks": completed,
                "pending_tasks": pending,
                "overdue_tasks": overdue,
                "productivity_percentage": productivity,
            }
        )


class ProductivityView(APIView):
    def get(self, request):
        qs = Task.objects.filter(user=request.user)
        by_status = qs.values("status").annotate(count=Count("id")).order_by("status")
        by_priority = qs.values("priority").annotate(count=Count("id")).order_by("priority")
        return Response({"by_status": list(by_status), "by_priority": list(by_priority)})


class WorkloadView(APIView):
    def get(self, request):
        workload = (
            Task.objects.filter(user=request.user, is_completed=False)
            .values("project__id", "project__name")
            .annotate(count=Count("id"))
            .order_by("-count")
        )
        return Response({"projects": list(workload)})
