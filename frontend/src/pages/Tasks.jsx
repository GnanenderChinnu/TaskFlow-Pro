import { Download, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { taskService } from "../api/taskService";
import EmptyState from "../components/EmptyState";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { PRIORITIES, STATUSES } from "../utils/constants";
import { useTaskData } from "./useTaskData";

export default function Tasks({ completed = false }) {
  const [filters, setFilters] = useState({ search: "", priority: "", status: "", due_date: "" });
  const [editing, setEditing] = useState(null);
  const query = useMemo(() => ({ ...filters, is_completed: completed ? "true" : "" }), [filters, completed]);
  const taskData = useTaskData(query);

  const exportCsv = () => {
    taskService.downloadCsv();
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h2 className="text-2xl font-bold">{completed ? "Completed task history" : "All tasks"}</h2>
          <p className="text-sm text-slate-500">Search, filter, edit, complete, and export tasks.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={exportCsv}><Download className="h-4 w-4" />CSV</button>
          {!completed && <button className="btn-primary" onClick={() => setEditing({})}><Plus className="h-4 w-4" />New task</button>}
        </div>
      </section>
      <section className="surface rounded-xl p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input className="field pl-9" placeholder="Search title, notes, project" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </div>
          <select className="field" value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
            <option value="">All priorities</option>
            {PRIORITIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <select className="field" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All statuses</option>
            {STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <input className="field" type="date" value={filters.due_date} onChange={(e) => setFilters({ ...filters, due_date: e.target.value })} />
        </div>
      </section>
      {taskData.tasks.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {taskData.tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={setEditing} onComplete={taskData.completeTask} onStatus={taskData.updateStatus} />)}
        </section>
      ) : (
        <EmptyState title={completed ? "No completed tasks yet" : "No tasks found"} message="Adjust filters or add your first task to start tracking real work." actionLabel={completed ? null : "Create task"} onAction={() => setEditing({})} />
      )}
      <TaskModal open={Boolean(editing)} task={editing?.id ? editing : null} projects={taskData.projects} categories={taskData.categories} onClose={() => setEditing(null)} onSubmit={async (payload) => { await taskData.saveTask(editing?.id ? editing : null, payload); setEditing(null); }} />
    </div>
  );
}
