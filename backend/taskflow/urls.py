from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from analytics.views import DashboardStatsView, ProductivityView, WorkloadView
from projects.views import CategoryViewSet, ProjectViewSet
from tasks.views import ReminderViewSet, SubTaskViewSet, TaskActivityViewSet, TaskViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("categories", CategoryViewSet, basename="category")
router.register("tasks", TaskViewSet, basename="task")
router.register("subtasks", SubTaskViewSet, basename="subtask")
router.register("reminders", ReminderViewSet, basename="reminder")
router.register("activities", TaskActivityViewSet, basename="activity")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/dashboard/stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("api/analytics/productivity/", ProductivityView.as_view(), name="productivity"),
    path("api/analytics/workload/", WorkloadView.as_view(), name="workload"),
    path("api/tasks/<int:task_pk>/subtasks/", SubTaskViewSet.as_view({"get": "list", "post": "create"}), name="task-subtasks"),
    path("api/", include(router.urls)),
]
