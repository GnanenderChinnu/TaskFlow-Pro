import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PRIORITIES, STATUSES, TASK_TYPES } from "../utils/constants";

const blank = {
  title: "",
  description: "",
  project: "",
  category: "",
  priority: "medium",
  status: "todo",
  task_type: "task",
  due_date: "",
  due_time: ""
};

export default function TaskModal({ open, task, projects, categories, onClose, onSubmit }) {
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(task ? {
      title: task.title || "",
      description: task.description || "",
      project: task.project || "",
      category: task.category || "",
      priority: task.priority || "medium",
      status: task.status || "todo",
      task_type: task.task_type || "task",
      due_date: task.due_date || "",
      due_time: task.due_time?.slice(0, 5) || ""
    } : blank);
    setError("");
  }, [task, open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }
    onSubmit({
      ...form,
      project: form.project || null,
      category: form.category || null,
      due_date: form.due_date || null,
      due_time: form.due_time || null
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <form className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-soft dark:bg-zinc-900" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{task ? "Edit task" : "New task"}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        {error && <div className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</div>}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="text-sm font-semibold">Title</span>
            <input className="field mt-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-sm font-semibold">Description</span>
            <textarea className="field mt-1 min-h-24" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <Select label="Priority" value={form.priority} options={PRIORITIES} onChange={(priority) => setForm({ ...form, priority })} />
          <Select label="Status" value={form.status} options={STATUSES} onChange={(status) => setForm({ ...form, status })} />
          <Select label="Type" value={form.task_type} options={TASK_TYPES} onChange={(task_type) => setForm({ ...form, task_type })} />
          <Select label="Project" value={form.project || ""} options={projects.map((p) => ({ value: p.id, label: p.name }))} placeholder="No project" onChange={(project) => setForm({ ...form, project })} />
          <Select label="Category" value={form.category || ""} options={categories.map((c) => ({ value: c.id, label: c.name }))} placeholder="No category" onChange={(category) => setForm({ ...form, category })} />
          <label>
            <span className="text-sm font-semibold">Due date</span>
            <input className="field mt-1" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
          </label>
          <label>
            <span className="text-sm font-semibold">Due time</span>
            <input className="field mt-1" type="time" value={form.due_time} onChange={(e) => setForm({ ...form, due_time: e.target.value })} />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="btn-primary" type="submit"><Save className="h-4 w-4" />Save task</button>
        </div>
      </form>
    </div>
  );
}

function Select({ label, value, options, placeholder, onChange }) {
  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <select className="field mt-1" value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
