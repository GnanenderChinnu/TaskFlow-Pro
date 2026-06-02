import { CheckCircle2 } from "lucide-react";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_520px] dark:bg-zinc-950">
      <section className="hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-lg font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink">TF</span>
          TaskFlow Pro
        </div>
        <div className="max-w-xl">
          <p className="mb-6 text-sm uppercase tracking-[0.22em] text-sky-200">Cloud task operations</p>
          <h1 className="text-5xl font-extrabold leading-tight">Plan work, ship tasks, and keep every device in sync.</h1>
          <div className="mt-8 grid gap-3 text-slate-200">
            {["Sprint boards and personal checklists", "JWT-secured Django REST API", "Analytics, reminders, CSV export"].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-400">Built for focused daily execution.</p>
      </section>
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="text-2xl font-extrabold">TaskFlow Pro</div>
          </div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-slate-500 dark:text-zinc-400">{subtitle}</p>
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
