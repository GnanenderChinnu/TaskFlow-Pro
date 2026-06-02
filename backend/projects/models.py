from django.conf import settings
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=20, default="#2563eb")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="projects")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "name")
        ordering = ("name",)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=80)
    color = models.CharField(max_length=20, default="#64748b")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="categories")

    class Meta:
        unique_together = ("user", "name")
        ordering = ("name",)

    def __str__(self):
        return self.name
