import { API_BASE_URL } from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/projects`;

export async function getProjects() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách dự án");
  }

  return response.json();
}

export async function getProjectBySlug(slug) {
  const response = await fetch(`${API_URL}/${slug}`);

  if (!response.ok) {
    throw new Error("Không thể lấy chi tiết dự án");
  }

  return response.json();
}

export async function createProject(projectData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm dự án");
  }

  return response.json();
}

export async function updateProject(id, projectData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật dự án");
  }

  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa dự án");
  }
}