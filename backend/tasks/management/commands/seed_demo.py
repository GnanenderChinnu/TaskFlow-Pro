from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from projects.models import Category, Project
from tasks.models import SubTask, Task


class Command(BaseCommand):
    help = "Create demo data for local TaskFlow Pro development."

    def handle(self, *args, **options):
        User = get_user_model()
        user, created = User.objects.get_or_create(
            username="demo",
            defaults={"email": "demo@taskflow.local", "full_name": "Demo User"},
        )
        if created:
            user.set_password("DemoPass123!")
            user.save()

        project, _ = Project.objects.get_or_create(user=user, name="Product Launch", defaults={"color": "#2563eb"})
        category, _ = Category.objects.get_or_create(user=user, name="Work", defaults={"color": "#0f766e"})

        tasks = [
            ("Review sprint backlog", Task.Priority.HIGH, Task.Status.IN_PROGRESS, Task.TaskType.TASK, 1),
            ("Fix login redirect bug", Task.Priority.URGENT, Task.Status.BLOCKED, Task.TaskType.BUG, 0),
            ("Send meeting action notes", Task.Priority.MEDIUM, Task.Status.TODO, Task.TaskType.MEETING, 2),
        ]
        for title, priority, status, task_type, due_offset in tasks:
            task, _ = Task.objects.get_or_create(
                user=user,
                title=title,
                defaults={
                    "project": project,
                    "category": category,
                    "priority": priority,
                    "status": status,
                    "task_type": task_type,
                    "due_date": date.today() + timedelta(days=due_offset),
                },
            )
            SubTask.objects.get_or_create(task=task, title="Clarify acceptance criteria")
            SubTask.objects.get_or_create(task=task, title="Share update with stakeholders")

        self.stdout.write(self.style.SUCCESS("Demo user ready: demo / DemoPass123!"))
