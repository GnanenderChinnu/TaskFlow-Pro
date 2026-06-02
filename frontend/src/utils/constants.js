export const PRIORITIES = [
  { value: "low", label: "Low", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { value: "medium", label: "Medium", tone: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  { value: "high", label: "High", tone: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
  { value: "urgent", label: "Urgent", tone: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" }
];

export const STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" }
];

export const TASK_TYPES = [
  { value: "task", label: "Task" },
  { value: "bug", label: "Bug / Issue" },
  { value: "meeting", label: "Meeting Action" },
  { value: "checklist", label: "Checklist" }
];

export function labelFor(list, value) {
  return list.find((item) => item.value === value)?.label || value;
}
