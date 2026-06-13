import "./Services.css";

const services = [
  {
    number: "01",
    title: "Thi công điện lạnh dân dụng",
    description:
      "Lắp đặt máy lạnh, hệ thống điều hòa cho nhà ở, văn phòng, cửa hàng, quán ăn và các công trình dân dụng.",
  },
  {
    number: "02",
    title: "Thi công điện lạnh công nghiệp",
    description:
      "Triển khai hệ thống làm lạnh cho nhà xưởng, kho lạnh, kho bảo quản, hệ thống thông gió và làm mát công nghiệp.",
  },
  {
    number: "03",
    title: "Lắp đặt máy lạnh",
    description:
      "Tư vấn vị trí lắp đặt, thi công đường ống, đi dây điện, lắp đặt máy lạnh đúng kỹ thuật và đảm bảo thẩm mỹ.",
  },
  {
    number: "04",
    title: "Sửa chữa thiết bị điện lạnh",
    description:
      "Kiểm tra và sửa chữa máy lạnh, tủ lạnh, tủ mát, tủ đông và các thiết bị làm lạnh gặp sự cố trong quá trình sử dụng.",
  },
  {
    number: "05",
    title: "Bảo trì – bảo dưỡng định kỳ",
    description:
      "Vệ sinh, kiểm tra gas, kiểm tra hệ thống điện, bảo dưỡng thiết bị giúp máy vận hành ổn định và tiết kiệm điện.",
  },
  {
    number: "06",
    title: "Mua bán thiết bị điện lạnh",
    description:
      "Cung cấp máy lạnh, tủ lạnh, tủ mát, tủ đông và các thiết bị điện lạnh phù hợp cho gia đình, cửa hàng và doanh nghiệp.",
  },
];

function Services() {
  return (
    <section className="services" id="dich-vu">
      <div className="services-container">
        <div className="services-heading">
          <p>Dịch vụ của chúng tôi</p>
          <h2>Giải pháp điện lạnh toàn diện cho dân dụng và công nghiệp</h2>
          <span>
            Cơ Điện Lạnh Bình Hưng cung cấp dịch vụ thi công, lắp đặt, sửa chữa,
            bảo trì và mua bán thiết bị điện lạnh với quy trình rõ ràng, kỹ thuật
            chuyên môn và chi phí hợp lý.
          </span>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-number">{service.number}</div>

              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="services-cta">
          <div>
            <h3>Bạn cần tư vấn giải pháp điện lạnh?</h3>
            <p>
              Liên hệ Bình Hưng để được khảo sát, tư vấn phương án thi công,
              sửa chữa hoặc bảo trì phù hợp với nhu cầu thực tế.
            </p>
          </div>

          <a href="#lien-he">Liên hệ ngay</a>
        </div>
      </div>
    </section>
  );
}

export default Services;