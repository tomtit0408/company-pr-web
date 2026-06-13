import { API_BASE_URL } from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/customers`;

export async function createCustomer(customerData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error("Không thể gửi thông tin khách hàng");
  }

  return response.json();
}

export async function getCustomers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách khách hàng");
  }

  return response.json();
}

export async function updateCustomerStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật trạng thái khách hàng");
  }

  return response.json();
}

export async function deleteCustomer(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa khách hàng");
  }
}