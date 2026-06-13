import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomers,
  updateCustomerStatus,
  deleteCustomer,
} from "../services/customerService";
import "./AdminCustomers.css";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      alert("Không thể tải danh sách khách hàng. Kiểm tra backend.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const updatedCustomer = await updateCustomerStatus(id, newStatus);

      const updatedCustomers = customers.map((customer) =>
        customer.id === id ? updatedCustomer : customer
      );

      setCustomers(updatedCustomers);
    } catch (error) {
      alert("Cập nhật trạng thái thất bại.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khách hàng này?");

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      const updatedCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(updatedCustomers);
    } catch (error) {
      alert("Xóa khách hàng thất bại.");
      console.error(error);
    }
  };

  return (
    <main className="admin-customers">
      <div className="admin-customers-container">
        <div className="admin-customers-header">
          <div>
            <p className="admin-customers-label">Admin</p>
            <h1>Quản lý khách hàng liên hệ</h1>
            <p>
              Danh sách khách hàng đã gửi form tư vấn trên website Bình Hưng.
              Dữ liệu đang được lấy từ MySQL.
            </p>
          </div>

          <Link to="/admin/dashboard" className="admin-customers-back">
            Về Dashboard
          </Link>
        </div>

        {isLoading ? (
          <div className="admin-empty">
            <h2>Đang tải dữ liệu...</h2>
          </div>
        ) : customers.length === 0 ? (
          <div className="admin-empty">
            <h2>Chưa có khách hàng nào gửi thông tin</h2>
            <p>Hãy thử gửi form ở mục Liên hệ ngoài trang chủ.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Nội dung</th>
                  <th>Ngày gửi</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.message}</td>
                    <td>
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleString("vi-VN")
                        : ""}
                    </td>
                    <td>
                      <select
                        value={customer.status}
                        onChange={(event) =>
                          handleChangeStatus(customer.id, event.target.value)
                        }
                      >
                        <option value="Chưa xử lý">Chưa xử lý</option>
                        <option value="Đang tư vấn">Đang tư vấn</option>
                        <option value="Đã xử lý">Đã xử lý</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(customer.id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminCustomers;