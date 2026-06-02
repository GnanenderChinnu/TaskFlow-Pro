import { Bug, CalendarClock, CheckCircle2, ClipboardCheck, MoreHorizontal, UsersRound } from "lucide-react";
import { PRIORITIES, labelFor, STATUSES, TASK_TYPES } from "../utils/constants";

const typeIcons = {
  task: ClipboardCheck,
  bug: Bug,
  meeting: UsersRound,
  checklist: ClipboardCheck
};

export default function TaskCard({ task, onEdit, onComplete, onStatus }) {
  const priority = PRIORITIES.find((item) => item.value === task.priority);
  const TypeIcon = typeIcons[task.task_type] || ClipboardCheck;

  return (
    <article className="surface rounded-xl p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-bold ${priority?.tone}`}>{priority?.label}</span>
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
              <TypeIcon className="h-3 w-3" /> {labelFor(TASK_TYPES, task.task_type)}
            </span>
          </div>
          <h3 className="mt-3 truncate text-base font-bold">{task.title}</h3>
          {task.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-zinc-400">{task.description}</p>}
        </div>
        <button className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-zinc-800" onClick={() => onEdit(task)} aria-label="Edit task">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <CalendarClock className="h-4 w-4" />
          {task.due_date ? `${task.due_date}${task.due_time ? ` at ${task.due_time.slice(0, 5)}` : ""}` : "No deadline"}
        </div>
        <select className="field w-auto py-1" value={task.status} onChange={(e) => onStatus(task.id, e.target.value)}>
          {STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
      </div>
      {task.total_subtasks > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500">
            <span>Checklist</span><span>{task.completed_subtasks}/{task.total_subtasks}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
            <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(task.completed_subtasks / task.total_subtasks) * 100}%` }} />
          </div>
        </div>
      )}
      <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600 dark:text-zinc-300" onClick={() => onComplete(task.id, !task.is_completed)}>
        <CheckCircle2 className={`h-4 w-4 ${task.is_completed ? "text-emerald-500" : ""}`} />
        {task.is_completed ? "Mark incomplete" : "Mark complete"}
      </button>
    </article>
  );
}
