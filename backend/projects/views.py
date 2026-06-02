from django.db.models import Count
from rest_framework import viewsets

from .models import Category, Project
from .serializers import CategorySerializer, ProjectSerializer


class OwnedModelViewSet(viewsets.ModelViewSet):
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectViewSet(OwnedModelViewSet):
    serializer_class = ProjectSerializer
    search_fields = ("name", "description")
    ordering_fields = ("name", "created_at", "updated_at")

    def get_queryset(self):
        return (
            Project.objects.filter(user=self.request.user)
            .annotate(task_count=Count("tasks"))
            .order_by("name")
        )


class CategoryViewSet(OwnedModelViewSet):
    serializer_class = CategorySerializer
    search_fields = ("name",)
    ordering_fields = ("name",)

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
