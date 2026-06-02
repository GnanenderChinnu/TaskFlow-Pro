import { AlertTriangle, CheckCircle2, Clock, ListTodo, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { taskService } from "../api/taskService";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useTaskData } from "./useTaskData";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const taskData = useTaskData({ ordering: "due_date" });

  useEffect(() => {
    taskService.stats().then(setStats).catch(() => toast.error("Could not load dashboard stats"));
  }, [taskData.tasks.length]);

  const openTasks = taskData.tasks.filter((task) => !task.is_completed).slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total" value={stats?.total_tasks ?? "-"} icon={ListTodo} />
        <StatCard label="Completed" value={stats?.completed_tasks ?? "-"} icon={CheckCircle2} tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" />
        <StatCard label="Pending" value={stats?.pending_tasks ?? "-"} icon={Clock} tone="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300" />
        <StatCard label="Overdue" value={stats?.overdue_tasks ?? "-"} icon={AlertTriangle} tone="bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300" />
        <StatCard label="Productivity" value={`${stats?.productivity_percentage ?? 0}%`} icon={Percent} />
      </section>
      <section className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Today’s focus</h2>
          <p className="text-sm text-slate-500">Upcoming and active work across projects.</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>New task</button>
      </section>
      {openTasks.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {openTasks.map((task) => <TaskCard key={task.id} task={task} onEdit={() => setModalOpen(task)} onComplete={taskData.completeTask} onStatus={taskData.updateStatus} />)}
        </section>
      ) : (
        <EmptyState title="Your board is clear" message="Create a task, add a deadline, and TaskFlow Pro will sync it across browsers." actionLabel="Create task" onAction={() => setModalOpen(true)} />
      )}
      <TaskModal open={Boolean(modalOpen)} task={modalOpen?.id ? modalOpen : null} projects={taskData.projects} categories={taskData.categories} onClose={() => setModalOpen(false)} onSubmit={async (payload) => { await taskData.saveTask(modalOpen?.id ? modalOpen : null, payload); setModalOpen(false); }} />
    </div>
  );
}
