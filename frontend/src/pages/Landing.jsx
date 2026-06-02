import { ArrowRight, CheckCircle2, KanbanSquare, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-zinc-950 dark:text-zinc-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3 text-lg font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm text-white dark:bg-white dark:text-slate-950">TF</span>
          TaskFlow Pro
        </Link>
        <div className="flex items-center gap-3">
          <Link className="btn-secondary" to="/login">Log in</Link>
          <Link className="btn-primary" to="/signup">Start free <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_560px] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Tasks, projects, and checklists</p>
          <h1 className="mt-5 text-5xl font-extrabold leading-tight lg:text-7xl">TaskFlow Pro</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
            A cloud-based productivity workspace for daily planning, IT work, student deadlines, freelance deliverables, and corporate task tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" to="/signup">Create workspace <ArrowRight className="h-4 w-4" /></Link>
            <Link className="btn-secondary" to="/login">Use demo account</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[["JWT security", ShieldCheck], ["Kanban workflow", KanbanSquare], ["Checklist history", CheckCircle2]].map(([label, Icon]) => (
              <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-800" key={label}>
                <Icon className="h-5 w-5 text-brand-600" />
                <div className="mt-3 text-sm font-bold">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-bold">Sprint Board</div>
              <div className="text-sm text-slate-500">Product Launch</div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">78% productive</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {["To Do", "In Progress", "Blocked"].map((col, idx) => (
              <div className="rounded-xl bg-white p-3 dark:bg-zinc-950" key={col}>
                <div className="mb-3 text-sm font-bold">{col}</div>
                {[1, 2, 3].slice(0, idx + 1).map((item) => (
                  <div className="mb-3 rounded-lg border border-slate-200 p-3 dark:border-zinc-800" key={item}>
                    <div className="h-3 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
                    <div className="mt-3 h-2 w-20 rounded bg-slate-100 dark:bg-zinc-800" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
