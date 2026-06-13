import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers } from "../services/customerService";
import { getProjects } from "../services/projectService";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const splitImages = (imageString) => {
    if (!imageString) return [];

    return imageString
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);
  };

  const getFirstImage = (imageString) => {
    const images = splitImages(imageString);
    return images.length > 0 ? images[0] : "";
  };

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      const customersData = await getCustomers();
      const projectsData = await getProjects();

      setCustomers(customersData);
      setProjects(projectsData);
    } catch (error) {
      alert("Không thể tải dữ liệu dashboard từ backend.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const pendingCustomers = customers.filter(
    (customer) => customer.status === "Chưa xử lý"
  );

  const processingCustomers = customers.filter(
    (customer) => customer.status === "Đang xử lý"
  );

  const completedCustomers = customers.filter(
    (customer) => customer.status === "Đã xử lý"
  );

  const latestCustomers = customers.slice(0, 5);
  const latestProjects = projects.slice(0, 3);

  if (isLoading) {
    return (
      <main className="admin-dashboard">
        <div className="admin-dashboard-container">
          <h1>Đang tải dashboard...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <p className="admin-dashboard-label">Admin Dashboard</p>
            <h1>Tổng quan hệ thống</h1>
            <p>
              Quản lý thông tin khách hàng liên hệ, dự án công ty và dữ liệu
              hiển thị trên website.
            </p>
          </div>

          <div className="admin-dashboard-actions">
            <Link to="/admin/customers">Quản lý khách hàng</Link>
            <Link to="/admin/projects">Quản lý dự án</Link>
          </div>
        </div>

        <section className="admin-dashboard-stats">
          <div className="dashboard-stat-card">
            <span>Tổng khách hàng</span>
            <strong>{customers.length}</strong>
            <p>Khách đã gửi thông tin liên hệ</p>
          </div>

          <div className="dashboard-stat-card">
            <span>Chưa xử lý</span>
            <strong>{pendingCustomers.length}</strong>
            <p>Khách hàng cần phản hồi</p>
          </div>

          <div className="dashboard-stat-card">
            <span>Đang xử lý</span>
            <strong>{processingCustomers.length}</strong>
            <p>Khách hàng đang được tư vấn</p>
          </div>

          <div className="dashboard-stat-card">
            <span>Đã xử lý</span>
            <strong>{completedCustomers.length}</strong>
            <p>Khách hàng đã hoàn tất xử lý</p>
          </div>

          <div className="dashboard-stat-card">
            <span>Dự án</span>
            <strong>{projects.length}</strong>
            <p>Dự án đang hiển thị trên website</p>
          </div>
        </section>

        <section className="admin-dashboard-grid">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Khách hàng mới nhất</h2>
              <Link to="/admin/customers">Xem tất cả</Link>
            </div>

            {latestCustomers.length === 0 ? (
              <p className="dashboard-empty">Chưa có khách hàng liên hệ.</p>
            ) : (
              <div className="dashboard-customer-list">
                {latestCustomers.map((customer) => (
                  <div className="dashboard-customer-item" key={customer.id}>
                    <div>
                      <h3>{customer.fullName}</h3>
                      <p>{customer.phone}</p>
                      <p>{customer.email}</p>
                    </div>

                    <span>{customer.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Dự án mới nhất</h2>
              <Link to="/admin/projects">Xem tất cả</Link>
            </div>

            {latestProjects.length === 0 ? (
              <p className="dashboard-empty">Chưa có dự án nào.</p>
            ) : (
              <div className="dashboard-project-list">
                {latestProjects.map((project) => (
                  <div className="dashboard-project-item" key={project.id}>
                    <img src={getFirstImage(project.image)} alt={project.title} />

                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;