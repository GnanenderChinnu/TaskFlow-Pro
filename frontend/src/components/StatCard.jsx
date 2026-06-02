export default function StatCard({ label, value, detail, icon: Icon, tone = "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" }) {
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">{label}</span>
        {Icon && <span className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}><Icon className="h-5 w-5" /></span>}
      </div>
      <div className="mt-4 text-3xl font-extrabold">{value}</div>
      {detail && <div className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{detail}</div>}
    </div>
  );
}
