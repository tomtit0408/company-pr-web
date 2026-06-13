import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { uploadProjectImage } from "../services/uploadService";
import "./AdminProjects.css";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

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
      alert("Không thể tải danh sách dự án từ backend.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    setImageFile(files);
    setPreviewImage(files.map((file) => URL.createObjectURL(file)));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
    });

    setImageFile([]);
    setPreviewImage([]);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tên dự án");
      return;
    }

    if (!formData.category.trim()) {
      alert("Vui lòng nhập loại dự án");
      return;
    }

    if (!formData.description.trim()) {
      alert("Vui lòng nhập mô tả dự án");
      return;
    }

    if (!editingId && imageFile.length === 0) {
      alert("Vui lòng chọn ít nhất 1 hình ảnh dự án");
      return;
    }

    try {
      let imageUrl = formData.image;

      if (imageFile.length > 0) {
        const uploadedImages = [];

        for (const file of imageFile) {
          const uploadResult = await uploadProjectImage(file);
          uploadedImages.push(uploadResult.imageUrl);
        }

        imageUrl = uploadedImages.join(",");
      }

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        image: imageUrl,
      };

      if (editingId) {
        await updateProject(editingId, projectData);
        alert("Cập nhật dự án thành công!");
      } else {
        await createProject(projectData);
        alert("Thêm dự án thành công!");
      }

      resetForm();
      loadProjects();
    } catch (error) {
      alert("Lưu dự án thất bại. Kiểm tra backend hoặc ảnh upload.");
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
    });

    setPreviewImage(splitImages(project.image));
    setImageFile([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa dự án này?");

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      alert("Xóa dự án thành công!");
      loadProjects();
    } catch (error) {
      alert("Xóa dự án thất bại.");
      console.error(error);
    }
  };

  return (
    <main className="admin-projects">
      <div className="admin-projects-container">
        <div className="admin-projects-header">
          <div>
            <p className="admin-projects-label">Admin</p>
            <h1>Quản lý dự án</h1>
            <p>
              Admin có thể thêm, sửa, xóa dự án. Dữ liệu được lưu vào MySQL
              thông qua Spring Boot.
            </p>
          </div>

          <Link to="/admin/customers" className="admin-projects-link">
            Quản lý khách hàng
          </Link>
        </div>

        <form className="admin-projects-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Cập nhật dự án" : "Thêm dự án mới"}</h2>

          <div className="admin-projects-form-grid">
            <input
              type="text"
              name="title"
              placeholder="Tên dự án"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Loại dự án"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-projects-upload">
            <label>Hình ảnh dự án</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            {previewImage.length > 0 && (
              <div className="admin-projects-preview-list">
                {previewImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="admin-projects-preview"
                  />
                ))}
              </div>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Mô tả ngắn về dự án"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <div className="admin-projects-actions">
            <button type="submit">
              {editingId ? "Lưu thay đổi" : "Thêm dự án"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Hủy sửa
              </button>
            )}
          </div>
        </form>

        {isLoading ? (
          <div className="admin-empty">
            <h2>Đang tải dự án...</h2>
          </div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">
            <h2>Chưa có dự án nào</h2>
            <p>Hãy thêm dự án đầu tiên bằng form phía trên.</p>
          </div>
        ) : (
          <div className="admin-projects-list">
            {projects.map((project) => (
              <article className="admin-projects-card" key={project.id}>
                <img src={getFirstImage(project.image)} alt={project.title} />

                <div className="admin-projects-card-content">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="admin-projects-card-actions">
                    <button onClick={() => handleEdit(project)}>Sửa</button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(project.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminProjects;