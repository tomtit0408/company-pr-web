import "./Partners.css";

const partners = [
  {
    name: "Cảng Vũng tàu",
    logo: "public/Partners/cangvt.jpg",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
  {
    name: "KCN Đông Xuyên",
    logo: "public/Partners/hiepphuoc.png",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
  {
    name: "LDT group",
    logo: "public/Partners/LDT.png",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
  {
    name: "PVD Tech",
    logo: "public/Partners/PVD tech.jpg",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
  {
    name: "Văn phòng doanh nghiệp",
    logo: "public/Partners/PVD-traning.png",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
  {
    name: "Viettel Vũng Tàu",
    logo: "public/Partners/viettel.png",
    description: "Đối tác khu vực Thành phố Vũng Tàu",
  },
];

function Partners() {
  return (
    <section className="partners" id="doi-tac">
      <div className="partners-container">
        <div className="partners-heading">
          <p>ĐỐI TÁC HỢP TÁC</p>
          <h2>Đồng hành cùng nhiều khách hàng và doanh nghiệp trong khu vực</h2>
          <span>
            Trong thời gian qua, Cơ Điện Lạnh Bình Hưng đã có cơ hội hợp tác
            với nhiều khách hàng cá nhân, hộ kinh doanh và doanh nghiệp tại
            Thành phố Vũng Tàu, khu vực Phú Mỹ, Khu công nghiệp Đông Xuyên,
            Khu công nghiệp Phú Mỹ và các khu vực lân cận.
          </span>
        </div>

        <div className="partners-marquee">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, index) => (
              <div className="partner-logo" key={index}>
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} />
                ) : (
                  <strong>{partner.name}</strong>
                )}
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}

export default Partners;