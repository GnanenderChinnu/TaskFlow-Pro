import django_filters

from .models import Task


class TaskFilter(django_filters.FilterSet):
    due_before = django_filters.DateFilter(field_name="due_date", lookup_expr="lte")
    due_after = django_filters.DateFilter(field_name="due_date", lookup_expr="gte")

    class Meta:
        model = Task
        fields = {
            "priority": ["exact"],
            "status": ["exact"],
            "task_type": ["exact"],
            "project": ["exact"],
            "category": ["exact"],
            "due_date": ["exact"],
            "is_completed": ["exact"],
        }
