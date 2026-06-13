import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/projectService";
import Partners from "../components/Partners";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const loadProjectDetail = async () => {
    try {
      setIsLoading(true);
      const data = await getProjectBySlug(slug);
      setProject(data);
    } catch (error) {
      console.error(error);
      setProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjectDetail();
  }, [slug]);

  const projectImages = project?.image
    ? project.image
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean)
    : [];

  useEffect(() => {
    if (projectImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === projectImages.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [projectImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <main className="project-detail">
        <div className="project-detail-container">
          <h1>Đang tải dự án...</h1>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-detail">
        <div className="project-detail-container">
          <h1>Không tìm thấy dự án</h1>
          <Link to="/">Quay về trang chủ</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail">
      <section className="project-detail-slider">
        {projectImages.length > 0 && (
          <img
            src={projectImages[currentImage]}
            alt={project.title}
            className="project-detail-slider-image"
          />
        )}

        <div className="project-detail-slider-overlay">
          <p>{project.category}</p>
          <h1>{project.title}</h1>
        </div>

        {projectImages.length > 1 && (
          <>
            <button className="project-slider-btn prev" onClick={prevImage}>
              ‹
            </button>

            <button className="project-slider-btn next" onClick={nextImage}>
              ›
            </button>

            <div className="project-slider-dots">
              {projectImages.map((_, index) => (
                <button
                  key={index}
                  className={index === currentImage ? "active" : ""}
                  onClick={() => setCurrentImage(index)}
                ></button>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="project-detail-container">
        <Link to="/" className="project-detail-back">
          ← Quay về trang chủ
        </Link>

        <div className="project-detail-content">
          <h2>Thông tin dự án</h2>

          <p>{project.description}</p>

          <div className="project-detail-info">
            <div>
              <strong>Loại dự án</strong>
              <span>{project.category}</span>
            </div>

            <div>
              <strong>Mã dự án</strong>
              <span>{project.slug}</span>
            </div>
          </div>
        </div>

        {projectImages.length > 1 && (
          <div className="project-gallery">
            <h2>Hình ảnh dự án</h2>

            <div className="project-gallery-grid">
              {projectImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

     

      <Projects />

      <Contact />
    </main>
  );
}

export default ProjectDetail;