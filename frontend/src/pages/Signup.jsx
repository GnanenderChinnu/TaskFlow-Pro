import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await register(form);
      navigate("/app");
    } catch (err) {
      setError(Object.values(err.response?.data || {}).flat().join(" ") || "Could not create account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthShell title="Create workspace" subtitle="Your tasks will sync through the API database.">
      <form className="space-y-4" onSubmit={submit}>
        {error && <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</div>}
        <label><span className="text-sm font-semibold">Full name</span><input className="field mt-1" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Username</span><input className="field mt-1" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Email</span><input className="field mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Password</span><input className="field mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="btn-primary w-full" disabled={saving}>{saving ? "Creating..." : "Sign up"}</button>
        <p className="text-center text-sm text-slate-500">Already have an account? <Link className="font-bold text-brand-600" to="/login">Log in</Link></p>
      </form>
    </AuthShell>
  );
}
