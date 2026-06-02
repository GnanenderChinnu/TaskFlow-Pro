import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(user || {});

  const save = async (event) => {
    event.preventDefault();
    const { data } = await api.put("/auth/me/", form);
    setUser(data);
    toast.success("Profile updated");
  };

  return (
    <form className="surface max-w-2xl rounded-xl p-6" onSubmit={save}>
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="mt-5 grid gap-4">
        <label><span className="text-sm font-semibold">Full name</span><input className="field mt-1" value={form.full_name || ""} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Email</span><input className="field mt-1" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label><span className="text-sm font-semibold">Timezone</span><input className="field mt-1" value={form.timezone || ""} onChange={(e) => setForm({ ...form, timezone: e.target.value })} /></label>
      </div>
      <button className="btn-primary mt-6">Save profile</button>
    </form>
  );
}
