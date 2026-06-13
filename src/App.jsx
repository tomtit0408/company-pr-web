import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCustomers from "./pages/AdminCustomers";
import AdminProjects from "./pages/AdminProjects";
import AdminBanners from "./pages/AdminBanners";
import AdminCompanyInfo from "./pages/AdminCompanyInfo";
import FloatingContact from "./components/FloatingContact";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/projects/:slug" element={<ProjectDetail />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminCustomers />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminProjects />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/banners"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminBanners />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/company-info"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminCompanyInfo />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      {!isAdminPage && <FloatingContact />}
      {!isAdminPage && <Footer />}

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;