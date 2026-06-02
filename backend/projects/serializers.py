from rest_framework import serializers

from .models import Category, Project


class ProjectSerializer(serializers.ModelSerializer):
    task_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Project
        fields = ("id", "name", "description", "color", "task_count", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "color")
        read_only_fields = ("id",)
