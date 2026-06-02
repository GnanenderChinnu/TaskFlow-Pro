import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { taskService } from "../api/taskService";
import StatCard from "../components/StatCard";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [productivity, setProductivity] = useState({ by_status: [], by_priority: [] });
  const [workload, setWorkload] = useState({ projects: [] });

  useEffect(() => {
    Promise.all([taskService.stats(), taskService.productivity(), taskService.workload()]).then(([s, p, w]) => {
      setStats(s);
      setProductivity(p);
      setWorkload(w);
    });
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Productivity" value={`${stats?.productivity_percentage ?? 0}%`} icon={BarChart3} />
        <StatCard label="Completed" value={stats?.completed_tasks ?? "-"} />
        <StatCard label="Overdue" value={stats?.overdue_tasks ?? "-"} />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        <Panel title="Status distribution" rows={productivity.by_status} labelKey="status" />
        <Panel title="Priority distribution" rows={productivity.by_priority} labelKey="priority" />
        <Panel title="Workload by project" rows={workload.projects} labelKey="project__name" />
      </section>
    </div>
  );
}

function Panel({ title, rows, labelKey }) {
  const max = Math.max(...rows.map((row) => row.count), 1);
  return (
    <div className="surface rounded-xl p-5">
      <h3 className="mb-4 font-bold">{title}</h3>
      <div className="space-y-4">
        {rows.length ? rows.map((row) => (
          <div key={row[labelKey] || "Unassigned"}>
            <div className="mb-1 flex justify-between text-sm"><span>{row[labelKey] || "Unassigned"}</span><span>{row.count}</span></div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-zinc-800"><div className="h-2 rounded-full bg-brand-500" style={{ width: `${(row.count / max) * 100}%` }} /></div>
          </div>
        )) : <p className="text-sm text-slate-500">No data yet.</p>}
      </div>
    </div>
  );
}
