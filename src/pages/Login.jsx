import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const adminEmails = [
    "admin@binhhung.com",
    "tamkhungbk1@gmail.com",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const defaultAdmin = {
      id: 1,
      fullName: "Admin Bình Hưng",
      email: "admin@binhhung.com",
      phone: "0900000000",
      password: "admin123",
      role: "admin",
      loginType: "local",
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.some((user) => user.email === defaultAdmin.email);

    const allUsers = adminExists ? users : [defaultAdmin, ...users];

    if (!adminExists) {
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    const user = allUsers.find(
      (item) =>
        item.email === formData.email && item.password === formData.password
    );

    if (!user) {
      alert("Email hoặc mật khẩu không đúng!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Đăng nhập thành công!");

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }

    window.location.reload();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const currentUser = {
        id: googleUser.uid,
        fullName: googleUser.displayName || "Người dùng Google",
        email: googleUser.email,
        phone: googleUser.phoneNumber || "",
        avatar: googleUser.photoURL || "",
        role: adminEmails.includes(googleUser.email) ? "admin" : "user",
        loginType: "google",
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert("Đăng nhập Gmail thành công!");

      if (currentUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      console.error("Google login error:", error);

      alert(
        `Đăng nhập Gmail thất bại.\n\nMã lỗi: ${error.code}\n\nNội dung: ${error.message}`
      );
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <p className="login-label">Welcome Back</p>
          <h1>Đăng nhập</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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

          <button type="submit">Đăng nhập</button>

          <button
            type="button"
            className="login-google-button"
            onClick={handleGoogleLogin}
          >
            Đăng nhập bằng Gmail
          </button>

          <p className="login-register-text">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>

          <div className="login-admin-note">
            <strong>Tài khoản admin test:</strong>
            <span>Email: admin@binhhung.com</span>
            <span>Mật khẩu: admin123</span>
          </div>
        </form>

        <div className="login-content">
          <h2>Bình Hưng Company</h2>
          <p>
            Đăng nhập để gửi thông tin tư vấn, kết nối với công ty và theo dõi
            các dịch vụ, dự án phù hợp với nhu cầu của bạn.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;