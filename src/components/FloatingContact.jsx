import { useEffect, useState } from "react";
import { getCompanyInfo } from "../services/companyInfoService";
import "./FloatingContact.css";

const defaultInfo = {
  hotline: "0900 000 000",
  email: "binhhungdienlanh@gmail.com",
  zalo: "0900 000 000",
};

function FloatingContact() {
  const [companyInfo, setCompanyInfo] = useState(defaultInfo);

  const loadCompanyInfo = async () => {
    try {
      const data = await getCompanyInfo();
      setCompanyInfo(data);
    } catch (error) {
      console.error("Không thể tải thông tin liên hệ:", error);
    }
  };

  useEffect(() => {
    loadCompanyInfo();

    window.addEventListener("companyInfoUpdated", loadCompanyInfo);

    return () => {
      window.removeEventListener("companyInfoUpdated", loadCompanyInfo);
    };
  }, []);

  const phoneNumber = companyInfo.hotline?.replace(/\D/g, "") || "";
  const zaloNumber =
    companyInfo.zalo?.replace(/\D/g, "") ||
    companyInfo.hotline?.replace(/\D/g, "") ||
    "";

  return (
    <div className="floating-contact">
      {phoneNumber && (
        <a href={`tel:${phoneNumber}`} className="floating-contact-item phone">
          <span>☎</span>
          <strong>Gọi ngay</strong>
        </a>
      )}

      {zaloNumber && (
        <a
          href={`https://zalo.me/${zaloNumber}`}
          target="_blank"
          rel="noreferrer"
          className="floating-contact-item zalo"
        >
          <span>Z</span>
          <strong>Zalo</strong>
        </a>
      )}

      {companyInfo.email && (
        <a
          href={`mailto:${companyInfo.email}`}
          className="floating-contact-item email"
        >
          <span>✉</span>
          <strong>Email</strong>
        </a>
      )}
    </div>
  );
}

export default FloatingContact;