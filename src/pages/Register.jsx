import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === formData.email);

    if (emailExists) {
      alert("Email này đã được đăng ký!");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "customer",
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-content">
          <p className="register-label">Create Account</p>
          <h1>Đăng ký tài khoản</h1>
          <p>
            Khách hàng có thể tạo tài khoản để gửi thông tin tư vấn, theo dõi
            dự án và liên hệ với công ty dễ dàng hơn.
          </p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <h2>Thông tin đăng ký</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
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
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Đăng ký</button>

          <p className="register-login-text">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;