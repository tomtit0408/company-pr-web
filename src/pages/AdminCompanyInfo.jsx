import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCompanyInfo,
  updateCompanyInfo,
} from "../services/companyInfoService";
import "./AdminCompanyInfo.css";

function AdminCompanyInfo() {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    hotline: "",
    email: "",
    facebook: "",
    zalo: "",
    workingTime: "",
    shortDescription: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadCompanyInfo = async () => {
    try {
      setIsLoading(true);

      const data = await getCompanyInfo();

      setFormData({
        companyName: data.companyName || "",
        address: data.address || "",
        hotline: data.hotline || "",
        email: data.email || "",
        facebook: data.facebook || "",
        zalo: data.zalo || "",
        workingTime: data.workingTime || "",
        shortDescription: data.shortDescription || "",
      });
    } catch (error) {
      alert("Không thể tải thông tin công ty.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.companyName.trim()) {
      alert("Vui lòng nhập tên công ty");
      return;
    }

    if (!formData.address.trim()) {
      alert("Vui lòng nhập địa chỉ");
      return;
    }

    if (!formData.hotline.trim()) {
      alert("Vui lòng nhập hotline");
      return;
    }

    if (!formData.email.trim()) {
      alert("Vui lòng nhập email");
      return;
    }

    try {
     await updateCompanyInfo(formData);
window.dispatchEvent(new Event("companyInfoUpdated"));
alert("Cập nhật thông tin công ty thành công!");
loadCompanyInfo();
    } catch (error) {
      alert("Cập nhật thất bại.");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <main className="admin-company-info">
        <div className="admin-company-info-container">
          <h1>Đang tải thông tin công ty...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-company-info">
      <div className="admin-company-info-container">
        <div className="admin-company-info-header">
          <div>
            <p>Admin</p>
            <h1>Thông tin công ty</h1>
            <span>
              Cập nhật thông tin hiển thị ở Footer và phần Liên hệ ngoài website.
            </span>
          </div>

          <Link to="/admin/dashboard">Quay về Dashboard</Link>
        </div>

        <form className="admin-company-info-form" onSubmit={handleSubmit}>
          <div className="admin-company-info-grid">
            <input
              type="text"
              name="companyName"
              placeholder="Tên công ty"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="hotline"
              placeholder="Hotline"
              value={formData.hotline}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="zalo"
              placeholder="Zalo"
              value={formData.zalo}
              onChange={handleChange}
            />

            <input
              type="text"
              name="facebook"
              placeholder="Link Facebook"
              value={formData.facebook}
              onChange={handleChange}
            />

            <input
              type="text"
              name="workingTime"
              placeholder="Thời gian làm việc"
              value={formData.workingTime}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="address"
            placeholder="Địa chỉ công ty"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>

          <textarea
            name="shortDescription"
            placeholder="Mô tả ngắn về công ty"
            value={formData.shortDescription}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Lưu thông tin công ty</button>
        </form>
      </div>
    </main>
  );
}

export default AdminCompanyInfo;