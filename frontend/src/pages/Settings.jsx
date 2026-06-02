import { useState } from "react";
import toast from "react-hot-toast";
import { taskService } from "../api/taskService";

export default function Settings() {
  const [project, setProject] = useState("");
  const [category, setCategory] = useState("");

  const createProject = async (event) => {
    event.preventDefault();
    if (!project.trim()) return;
    await taskService.createProject({ name: project });
    setProject("");
    toast.success("Project created");
  };

  const createCategory = async (event) => {
    event.preventDefault();
    if (!category.trim()) return;
    await taskService.createCategory({ name: category });
    setCategory("");
    toast.success("Category created");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <form className="surface rounded-xl p-6" onSubmit={createProject}>
        <h2 className="text-xl font-bold">Projects</h2>
        <p className="mt-1 text-sm text-slate-500">Create project boards for teams, sprints, or clients.</p>
        <input className="field mt-5" placeholder="Project name" value={project} onChange={(e) => setProject(e.target.value)} />
        <button className="btn-primary mt-4">Add project</button>
      </form>
      <form className="surface rounded-xl p-6" onSubmit={createCategory}>
        <h2 className="text-xl font-bold">Categories</h2>
        <p className="mt-1 text-sm text-slate-500">Group tasks by work, study, personal, or operations.</p>
        <input className="field mt-5" placeholder="Category name" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button className="btn-primary mt-4">Add category</button>
      </form>
    </div>
  );
}
