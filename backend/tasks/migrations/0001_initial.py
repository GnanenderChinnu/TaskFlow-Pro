import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("projects", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Task",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=180)),
                ("description", models.TextField(blank=True)),
                ("priority", models.CharField(choices=[("low", "Low"), ("medium", "Medium"), ("high", "High"), ("urgent", "Urgent")], default="medium", max_length=20)),
                ("status", models.CharField(choices=[("todo", "To Do"), ("in_progress", "In Progress"), ("blocked", "Blocked"), ("done", "Done")], default="todo", max_length=20)),
                ("task_type", models.CharField(choices=[("task", "Task"), ("bug", "Bug / Issue"), ("meeting", "Meeting Action Item"), ("checklist", "Checklist")], default="task", max_length=20)),
                ("due_date", models.DateField(blank=True, null=True)),
                ("due_time", models.TimeField(blank=True, null=True)),
                ("is_completed", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("category", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="tasks", to="projects.category")),
                ("project", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="tasks", to="projects.project")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="tasks", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ("is_completed", "due_date", "-updated_at"),
                "indexes": [
                    models.Index(fields=["user", "status"], name="tasks_task_user_id_c0fce1_idx"),
                    models.Index(fields=["user", "priority"], name="tasks_task_user_id_13ec9e_idx"),
                    models.Index(fields=["user", "due_date"], name="tasks_task_user_id_075050_idx"),
                ],
            },
        ),
        migrations.CreateModel(
            name="SubTask",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=180)),
                ("is_completed", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("task", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="subtasks", to="tasks.task")),
            ],
            options={
                "ordering": ("is_completed", "created_at"),
            },
        ),
        migrations.CreateModel(
            name="TaskActivity",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("action", models.CharField(max_length=120)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("task", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="activities", to="tasks.task")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="task_activities", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ("-created_at",),
            },
        ),
        migrations.CreateModel(
            name="Reminder",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("remind_at", models.DateTimeField()),
                ("message", models.CharField(blank=True, max_length=220)),
                ("is_sent", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("task", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="reminders", to="tasks.task")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="reminders", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ("remind_at",),
            },
        ),
    ]
