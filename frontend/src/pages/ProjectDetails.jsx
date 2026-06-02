import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useTaskData } from "./useTaskData";

export default function ProjectDetails() {
  const { id } = useParams();
  const taskData = useTaskData({ project: id });
  const project = taskData.projects.find((item) => String(item.id) === String(id));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{project?.name || "Project"}</h2>
        <p className="text-sm text-slate-500">{project?.description || "Project-wise task board."}</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {taskData.tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={() => {}} onComplete={taskData.completeTask} onStatus={taskData.updateStatus} />)}
      </section>
    </div>
  );
}
