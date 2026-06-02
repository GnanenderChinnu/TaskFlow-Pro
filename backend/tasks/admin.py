from django.contrib import admin

from .models import Reminder, SubTask, Task, TaskActivity

admin.site.register(Task)
admin.site.register(SubTask)
admin.site.register(TaskActivity)
admin.site.register(Reminder)
