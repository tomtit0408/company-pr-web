import { useEffect, useState } from "react";
import { createCustomer } from "../services/customerService";
import { getCompanyInfo } from "../services/companyInfoService";
import "./contact.css";

const defaultInfo = {
  address:
    "109 Bến Nôm, Phường Rạch Dừa, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu",
  hotline: "0900 000 000",
  email: "binhhungdienlanh@gmail.com",
  workingTime: "Thứ 2 - Chủ nhật: 7:30 - 18:00",
};

function Contact() {
  const [companyInfo, setCompanyInfo] = useState(defaultInfo);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const data = await getCompanyInfo();
        setCompanyInfo(data);
      } catch (error) {
        console.error("Không thể tải thông tin công ty:", error);
      }
    };

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

    if (!formData.fullName.trim()) {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (!formData.email.trim()) {
      alert("Vui lòng nhập email");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (!formData.message.trim()) {
      alert("Vui lòng nhập nội dung cần tư vấn");
      return;
    }

    try {
      setIsSubmitting(true);

      await createCustomer(formData);

      alert("Gửi thông tin thành công! Bình Hưng sẽ liên hệ lại sớm nhất.");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Gửi thông tin thất bại. Vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  companyInfo.address
)}&output=embed`;

  return (
    <section className="contact" id="lien-he">
      <div className="contact-container">
        <div className="contact-info">
          <p className="contact-label">Liên hệ tư vấn</p>

          <h2>Cần thi công, lắp đặt hoặc sửa chữa điện lạnh?</h2>

          <p className="contact-description">
            Hãy để lại thông tin, đội ngũ Cơ Điện Lạnh Bình Hưng sẽ tiếp nhận
            và liên hệ tư vấn giải pháp phù hợp cho nhà ở, văn phòng, cửa hàng,
            nhà xưởng hoặc hệ thống điện lạnh công nghiệp.
          </p>

          <div className="contact-list">
            <div className="contact-item">
              <span>01</span>
              <div>
                <h3>Địa chỉ công ty</h3>
                <p>{companyInfo.address}</p>
              </div>
            </div>

            <div className="contact-item">
              <span>02</span>
              <div>
                <h3>Hotline</h3>
                <p>{companyInfo.hotline}</p>
              </div>
            </div>

            <div className="contact-item">
              <span>03</span>
              <div>
                <h3>Email</h3>
                <p>{companyInfo.email}</p>
              </div>
            </div>

            <div className="contact-item">
              <span>04</span>
              <div>
                <h3>Thời gian làm việc</h3>
                <p>{companyInfo.workingTime}</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Gửi yêu cầu tư vấn</h3>

          <div className="contact-form-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
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
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email của bạn"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Nội dung cần tư vấn: lắp đặt máy lạnh, sửa chữa tủ lạnh, bảo trì hệ thống lạnh, thi công kho lạnh..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
          </button>

        </form>
     <div className="contact-map">
    <div className="contact-map-heading">
      <h3>Vị trí công ty</h3>
      <p>{companyInfo.address}</p>
    </div>

    <iframe
      title="Bản đồ Cơ Điện Lạnh Bình Hưng"
      src={mapUrl}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

      </div>
    </section>
  );
}

export default Contact;