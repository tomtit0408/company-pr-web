import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../data/companyData";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          Bình Hưng
          <span>Cơ Điện Lạnh</span>
        </Link>

        <button
          className={`header-menu-button ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-label="Mở menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`header-menu ${isMenuOpen ? "open" : ""}`}>
          <nav className="header-nav">
            {navLinks.map((item) => (
              <a key={item.href} href={`/${item.href}`} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-auth">
            {currentUser ? (
              <>
                {currentUser.role === "admin" && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="header-login"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/admin/banners"
                      className="header-login"
                      onClick={closeMenu}
                    >
                      Banner
                    </Link>

                    <Link
                      to="/admin/customers"
                      className="header-login"
                      onClick={closeMenu}
                    >
                      Khách hàng
                    </Link>

                    <Link
                      to="/admin/projects"
                      className="header-login"
                      onClick={closeMenu}
                    >
                      Dự án
                    </Link>

                    <Link
  to="/admin/company-info"
  className="header-login"
  onClick={closeMenu}
>
  Công ty
</Link>
                  </>
                )}

                <span className="header-user">{currentUser.fullName}</span>

                <button className="header-logout" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-login" onClick={closeMenu}>
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="header-register"
                  onClick={closeMenu}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;