# API Notes

All application endpoints require JWT authentication except register, login, and token refresh.

Send authenticated requests with:

```http
Authorization: Bearer <access-token>
```

Task list supports pagination, search, ordering, and filters:

```text
/api/tasks/?search=bug&priority=urgent&status=blocked&due_after=2026-06-01&ordering=due_date
```

Each queryset is scoped to `request.user`, so users can only access their own projects, categories, tasks, subtasks, activities, and reminders.
