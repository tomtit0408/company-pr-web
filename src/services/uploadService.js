import { API_BASE_URL } from "./apiConfig";

export async function uploadProjectImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/project-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload ảnh dự án thất bại");
  }

  return response.json();
}

export async function uploadBannerImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/banner-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload ảnh banner thất bại");
  }

  return response.json();
}