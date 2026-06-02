import { PlusCircle } from "lucide-react";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-white py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100 dark:bg-zinc-800">
        <PlusCircle className="h-7 w-7 text-slate-500" />
      </div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-zinc-400">{message}</p>
      {actionLabel && <button className="btn-primary mt-5" onClick={onAction}><PlusCircle className="h-4 w-4" />{actionLabel}</button>}
    </div>
  );
}
