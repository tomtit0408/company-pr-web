import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>Bình Hưng</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin/dashboard">Tổng quan</NavLink>
          <NavLink to="/admin/banners">Banner</NavLink>
          <NavLink to="/admin/projects">Dự án</NavLink>
          <NavLink to="/admin/customers">Khách hàng</NavLink>
          <NavLink to="/admin/company-info">Thông tin công ty</NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <p>{currentUser?.fullName || "Admin"}</p>

          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      </aside>

      <section className="admin-main-content">{children}</section>
    </div>
  );
}

export default AdminLayout;