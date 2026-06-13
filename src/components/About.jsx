import "./About.css";

function About() {
  return (
    <section className="about" id="gioi-thieu">
      <div className="about-container">
        <div className="about-left">
          <p className="about-label">GIỚI THIỆU VỀ CÔNG TY</p>

          <h2>Công ty TNHH Cơ Điện Lạnh Bình Hưng</h2>

          <p className="about-description">
            Công ty TNHH Cơ Điện Lạnh Bình Hưng là đơn vị chuyên thi công,
            lắp đặt, sửa chữa, bảo trì và bảo dưỡng các hệ thống điện lạnh dân
            dụng và công nghiệp. Công ty được thành lập vào ngày 19/10/2022,
            có trụ sở tại 109 Bến Nôm, Phường Rạch Dừa, Thành phố Vũng Tàu,
            Tỉnh Bà Rịa - Vũng Tàu, Việt Nam.
          </p>

          <p className="about-description">
            Với định hướng phát triển bền vững, Bình Hưng luôn chú trọng chất
            lượng thi công, tiến độ thực hiện và sự hài lòng của khách hàng.
            Công ty cung cấp giải pháp điện lạnh phù hợp cho nhà ở, văn phòng,
            cửa hàng, nhà xưởng, kho lạnh và các doanh nghiệp sản xuất trong
            khu vực.
          </p>

          <div className="about-stats">
            <div>
              <strong>2022</strong>
              <span>Năm thành lập</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Công trình đã thực hiện</span>
            </div>

            <div>
              <strong>20+</strong>
              <span>Đối tác doanh nghiệp</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-card main-card">
            <h3>Lĩnh vực hoạt động</h3>
            <p>
              Thi công, lắp đặt và bảo trì hệ thống điện lạnh cho dân dụng,
              thương mại và công nghiệp.
            </p>
          </div>

          <div className="about-service-grid">
            <div className="about-service-card">
              <span>01</span>
              <h4>Điện lạnh dân dụng</h4>
              <p>
                Lắp đặt máy lạnh, hệ thống điều hòa cho nhà ở, văn phòng,
                cửa hàng, quán ăn và công trình dân dụng.
              </p>
            </div>

            <div className="about-service-card">
              <span>02</span>
              <h4>Điện lạnh công nghiệp</h4>
              <p>
                Thi công hệ thống lạnh cho nhà xưởng, kho lạnh, kho bảo quản,
                hệ thống làm mát và thông gió công nghiệp.
              </p>
            </div>

            <div className="about-service-card">
              <span>03</span>
              <h4>Mua bán thiết bị</h4>
              <p>
                Cung cấp các thiết bị điện lạnh như máy lạnh, tủ lạnh, tủ mát,
                tủ đông và các thiết bị làm lạnh khác.
              </p>
            </div>

            <div className="about-service-card">
              <span>04</span>
              <h4>Sửa chữa & bảo trì</h4>
              <p>
                Nhận sửa chữa, bảo trì, bảo dưỡng định kỳ nhằm giúp thiết bị
                vận hành ổn định, tiết kiệm điện và bền bỉ hơn.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-partner">
        <div>
          <h3>Đối tác & khu vực hoạt động</h3>
          <p>
            Trong thời gian qua, Cơ Điện Lạnh Bình Hưng đã hợp tác với nhiều
            khách hàng cá nhân, hộ kinh doanh và doanh nghiệp tại Thành phố
            Vũng Tàu, khu vực Phú Mỹ, Khu công nghiệp Đông Xuyên, Khu công
            nghiệp Phú Mỹ và các khu vực lân cận.
          </p>
        </div>

        <a href="#lien-he">Liên hệ tư vấn</a>
      </div>
    </section>
  );
}

export default About;