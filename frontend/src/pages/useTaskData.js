import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { unwrapList } from "../api/client";
import { taskService } from "../api/taskService";

export function useTaskData(params = {}) {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [taskData, projectData, categoryData] = await Promise.all([
        taskService.tasks(params),
        taskService.projects(),
        taskService.categories()
      ]);
      setTasks(unwrapList(taskData));
      setProjects(unwrapList(projectData));
      setCategories(unwrapList(categoryData));
    } catch {
      toast.error("Could not load task data");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    load();
  }, [load]);

  const saveTask = async (task, payload) => {
    try {
      if (task) await taskService.updateTask(task.id, payload);
      else await taskService.createTask(payload);
      toast.success(task ? "Task updated" : "Task created");
      await load();
    } catch {
      toast.error("Could not save task");
    }
  };

  const completeTask = async (id, isCompleted) => {
    await taskService.completeTask(id, isCompleted);
    await load();
  };

  const updateStatus = async (id, status) => {
    await taskService.updateStatus(id, status);
    await load();
  };

  return { tasks, projects, categories, loading, load, saveTask, completeTask, updateStatus };
}
