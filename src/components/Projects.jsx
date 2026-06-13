import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const splitImages = (imageString) => {
    if (!imageString) return [];

    return imageString
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);
  };

  const getFirstImage = (imageString) => {
    const images = splitImages(imageString);
    return images.length > 0 ? images[0] : "";
  };

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section className="projects" id="du-an">
      <div className="projects-container">
        <div className="projects-heading">
          <p>DỰ ÁN TIÊU BIỂU</p>
          <h2>Các công trình và dự án đã thực hiện</h2>
          <span>
            Những dự án được cập nhật trực tiếp từ hệ thống quản trị của công ty.
          </span>
        </div>

        {isLoading ? (
          <div className="projects-empty">
            <h3>Đang tải dự án...</h3>
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-empty">
            <h3>Chưa có dự án nào</h3>
            <p>Admin có thể thêm dự án trong trang quản trị.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-image">
                  <img
                    src={getFirstImage(project.image)}
                    alt={project.title}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />
                </div>

                <div className="project-content">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <Link to={`/projects/${project.slug}`} className="project-link">
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;