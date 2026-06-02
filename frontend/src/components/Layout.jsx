import { BarChart3, CalendarDays, CheckCircle2, KanbanSquare, LayoutDashboard, ListTodo, LogOut, Menu, Moon, Search, Settings, Sun, UserRound, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/tasks", label: "Tasks", icon: ListTodo },
  { to: "/app/kanban", label: "Kanban", icon: KanbanSquare },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/completed", label: "Completed", icon: CheckCircle2 },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/profile", label: "Profile", icon: UserRound },
  { to: "/app/settings", label: "Settings", icon: Settings }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const title = nav.find((item) => item.to === location.pathname)?.label || "Project";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-4 transition lg:translate-x-0 dark:border-zinc-800 dark:bg-zinc-950`}>
        <div className="mb-8 flex items-center justify-between">
          <NavLink to="/app" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-sm font-black text-white dark:bg-white dark:text-ink">TF</span>
            <div>
              <div className="font-extrabold">TaskFlow Pro</div>
              <div className="text-xs text-slate-500">Workspace cloud</div>
            </div>
          </NavLink>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/app"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-slate-950 text-white dark:bg-white dark:text-zinc-950" : "text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-900"}`
              }
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-200 p-3 dark:border-zinc-800">
          <div className="text-sm font-semibold">{user?.full_name || user?.username}</div>
          <div className="truncate text-xs text-slate-500">{user?.email}</div>
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold dark:bg-zinc-900" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur lg:px-8 dark:border-zinc-800 dark:bg-zinc-950/85">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open sidebar">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 md:flex dark:border-zinc-800">
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500">Search from Tasks</span>
            </div>
            <button className="btn-secondary px-3" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
