import { API_BASE_URL } from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/company-info`;

export async function getCompanyInfo() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin công ty");
  }

  return response.json();
}

export async function updateCompanyInfo(companyInfoData) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyInfoData),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật thông tin công ty");
  }

  return response.json();
}