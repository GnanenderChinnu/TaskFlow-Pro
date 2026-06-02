import { format, getDaysInMonth, startOfMonth } from "date-fns";
import { useMemo } from "react";
import { useTaskData } from "./useTaskData";

export default function CalendarView() {
  const taskData = useTaskData();
  const now = new Date();
  const days = useMemo(() => {
    const first = startOfMonth(now);
    return Array.from({ length: getDaysInMonth(now) }, (_, index) => new Date(first.getFullYear(), first.getMonth(), index + 1));
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{format(now, "MMMM yyyy")}</h2>
        <p className="text-sm text-slate-500">Calendar-style deadline view.</p>
      </div>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const tasks = taskData.tasks.filter((task) => task.due_date === key);
          return (
            <div className="surface min-h-32 rounded-xl p-3" key={key}>
              <div className="mb-2 text-sm font-bold">{format(day, "d EEE")}</div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div className="rounded-lg bg-slate-100 p-2 text-xs font-semibold dark:bg-zinc-800" key={task.id}>{task.title}</div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
