import { useEffect, useState } from "react";
import { getCompanyInfo } from "../services/companyInfoService";
import "./Footer.css";

const defaultInfo = {
  companyName: "Công ty TNHH Cơ Điện Lạnh Bình Hưng",
  address:
    "109 Bến Nôm, Phường Rạch Dừa, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu",
  hotline: "0900 000 000",
  email: "binhhungdienlanh@gmail.com",
  facebook: "",
  zalo: "",
  workingTime: "Thứ 2 - Chủ nhật: 7:30 - 18:00",
  shortDescription:
    "Đơn vị chuyên thi công, lắp đặt, sửa chữa, bảo trì và bảo dưỡng hệ thống điện lạnh dân dụng, thương mại và công nghiệp.",
};

function Footer() {
  const [companyInfo, setCompanyInfo] = useState(defaultInfo);

  const loadCompanyInfo = async () => {
    try {
      const data = await getCompanyInfo();
      setCompanyInfo(data);
    } catch (error) {
      console.error("Không thể tải thông tin công ty:", error);
    }
  };

  useEffect(() => {
    loadCompanyInfo();

    window.addEventListener("companyInfoUpdated", loadCompanyInfo);

    return () => {
      window.removeEventListener("companyInfoUpdated", loadCompanyInfo);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column footer-brand">
          <h2>{companyInfo.companyName}</h2>

          <p>{companyInfo.shortDescription}</p>

          <div className="footer-socials">
            {companyInfo.facebook && (
              <a href={companyInfo.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            )}

            {companyInfo.zalo && (
              <a
                href={`https://zalo.me/${companyInfo.zalo}`}
                target="_blank"
                rel="noreferrer"
              >
                Zalo
              </a>
            )}

            <a href={`mailto:${companyInfo.email}`}>Email</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Liên kết nhanh</h3>

          <ul>
            <li>
              <a href="/#trang-chu">Trang chủ</a>
            </li>
            <li>
              <a href="/#gioi-thieu">Giới thiệu công ty</a>
            </li>
            <li>
              <a href="/#dich-vu">Dịch vụ</a>
            </li>
            <li>
              <a href="/#doi-tac">Đối tác</a>
            </li>
            <li>
              <a href="/#du-an">Dự án</a>
            </li>
            <li>
              <a href="/#lien-he">Liên hệ</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Dịch vụ nổi bật</h3>

          <ul>
            <li>Thi công điện lạnh dân dụng</li>
            <li>Thi công điện lạnh công nghiệp</li>
            <li>Lắp đặt máy lạnh</li>
            <li>Sửa chữa máy lạnh, tủ lạnh, tủ mát</li>
            <li>Bảo trì – bảo dưỡng định kỳ</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Thông tin liên hệ</h3>

          <div className="footer-contact">
            <p>
              <strong>Địa chỉ:</strong>
              <span>{companyInfo.address}</span>
            </p>

            <p>
              <strong>Hotline:</strong>
              <span>{companyInfo.hotline}</span>
            </p>

            <p>
              <strong>Email:</strong>
              <span>{companyInfo.email}</span>
            </p>

            <p>
              <strong>Thời gian làm việc:</strong>
              <span>{companyInfo.workingTime}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 {companyInfo.companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;