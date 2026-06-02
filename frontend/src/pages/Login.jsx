import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await login(form);
      navigate("/app");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to manage your synced tasks.">
      <form className="space-y-4" onSubmit={submit}>
        {error && <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</div>}
        <label><span className="text-sm font-semibold">Username</span><input className="field mt-1" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Password</span><input className="field mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="btn-primary w-full" disabled={saving}>{saving ? "Signing in..." : "Log in"}</button>
        <p className="text-center text-sm text-slate-500">No account? <Link className="font-bold text-brand-600" to="/signup">Create one</Link></p>
      </form>
    </AuthShell>
  );
}
