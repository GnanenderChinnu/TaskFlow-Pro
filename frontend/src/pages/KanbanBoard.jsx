import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { STATUSES } from "../utils/constants";
import { useState } from "react";
import { useTaskData } from "./useTaskData";

export default function KanbanBoard() {
  const [editing, setEditing] = useState(null);
  const taskData = useTaskData();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sprint Kanban</h2>
          <p className="text-sm text-slate-500">Project-wise workflow with blocked work visible.</p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({})}>New task</button>
      </div>
      <section className="grid gap-4 xl:grid-cols-4">
        {STATUSES.map((status) => {
          const tasks = taskData.tasks.filter((task) => task.status === status.value);
          return (
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-3 dark:border-zinc-800 dark:bg-zinc-900" key={status.value}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">{status.label}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold dark:bg-zinc-950">{tasks.length}</span>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={setEditing} onComplete={taskData.completeTask} onStatus={taskData.updateStatus} />)}
              </div>
            </div>
          );
        })}
      </section>
      <TaskModal open={Boolean(editing)} task={editing?.id ? editing : null} projects={taskData.projects} categories={taskData.categories} onClose={() => setEditing(null)} onSubmit={async (payload) => { await taskData.saveTask(editing?.id ? editing : null, payload); setEditing(null); }} />
    </div>
  );
}
