import { api } from "./client";

export const taskService = {
  stats: () => api.get("/dashboard/stats/").then((r) => r.data),
  productivity: () => api.get("/analytics/productivity/").then((r) => r.data),
  workload: () => api.get("/analytics/workload/").then((r) => r.data),
  projects: () => api.get("/projects/").then((r) => r.data),
  categories: () => api.get("/categories/").then((r) => r.data),
  tasks: (params = {}) => api.get("/tasks/", { params }).then((r) => r.data),
  createTask: (payload) => api.post("/tasks/", payload).then((r) => r.data),
  updateTask: (id, payload) => api.put(`/tasks/${id}/`, payload).then((r) => r.data),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
  completeTask: (id, is_completed) => api.patch(`/tasks/${id}/complete/`, { is_completed }).then((r) => r.data),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/status/`, { status }).then((r) => r.data),
  createProject: (payload) => api.post("/projects/", payload).then((r) => r.data),
  createCategory: (payload) => api.post("/categories/", payload).then((r) => r.data),
  createSubtask: (taskId, title) => api.post(`/tasks/${taskId}/subtasks/`, { title }).then((r) => r.data),
  completeSubtask: (id, is_completed) => api.patch(`/subtasks/${id}/complete/`, { is_completed }).then((r) => r.data),
  downloadCsv: async () => {
    const response = await api.get("/tasks/export/csv/", { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "taskflow_tasks.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
};
