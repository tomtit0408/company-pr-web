import { useEffect, useState } from "react";
import { getActiveBanners } from "../services/bannerService";
import "./HeroSlider.css";

const defaultSlides = [
  {
    title: "Cơ Điện Lạnh Bình Hưng",
    subtitle: "Thi công – lắp đặt – sửa chữa – bảo trì điện lạnh",
    description:
      "Cung cấp giải pháp điện lạnh dân dụng và công nghiệp cho nhà ở, văn phòng, cửa hàng, nhà xưởng, kho lạnh và doanh nghiệp trong khu vực Vũng Tàu – Phú Mỹ.",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1600&auto=format&fit=crop",
  },
];

function HeroSlider() {
  const [heroSlides, setHeroSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadBanners = async () => {
    try {
      const data = await getActiveBanners();

      if (data.length > 0) {
        setHeroSlides(data);
      } else {
        setHeroSlides(defaultSlides);
      }
    } catch (error) {
      console.error("Không thể tải banner:", error);
      setHeroSlides(defaultSlides);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero-slider" id="trang-chu">
      {heroSlides.map((slide, index) => (
        <div
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          key={slide.id || index}
        >
          <img src={slide.image} alt={slide.title} />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <p className="hero-subtitle">{slide.subtitle}</p>

            <h1>{slide.title}</h1>

            <p className="hero-description">{slide.description}</p>

            <div className="hero-actions">
              <a href="#lien-he" className="hero-primary-btn">
                Liên hệ tư vấn
              </a>

              <a href="#du-an" className="hero-secondary-btn">
                Xem dự án
              </a>
            </div>
          </div>
        </div>
      ))}

      {heroSlides.length > 1 && (
        <>
          <button className="hero-btn hero-prev" onClick={prevSlide}>
            ‹
          </button>

          <button className="hero-btn hero-next" onClick={nextSlide}>
            ›
          </button>

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={index === currentSlide ? "active" : ""}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default HeroSlider;