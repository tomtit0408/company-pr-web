import { API_BASE_URL } from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/banners`;

export async function getActiveBanners() {
  const response = await fetch(`${API_URL}/active`);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách banner đang hiển thị");
  }

  return response.json();
}

export async function getBanners() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách banner");
  }

  return response.json();
}

export async function createBanner(bannerData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bannerData),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm banner");
  }

  return response.json();
}

export async function updateBanner(id, bannerData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bannerData),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật banner");
  }

  return response.json();
}

export async function deleteBanner(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa banner");
  }
}