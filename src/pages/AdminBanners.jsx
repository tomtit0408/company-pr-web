import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../services/bannerService";
import { uploadBannerImage } from "../services/uploadService";
import "./AdminBanners.css";

function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    displayOrder: 1,
    status: "Hiển thị",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const loadBanners = async () => {
    try {
      setIsLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      alert("Không thể tải danh sách banner.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "displayOrder" ? Number(value) : value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      displayOrder: 1,
      status: "Hiển thị",
    });

    setImageFile(null);
    setPreviewImage("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề banner");
      return;
    }

    if (!formData.subtitle.trim()) {
      alert("Vui lòng nhập phụ đề banner");
      return;
    }

    if (!formData.description.trim()) {
      alert("Vui lòng nhập mô tả banner");
      return;
    }

    if (!editingId && !imageFile) {
      alert("Vui lòng chọn ảnh banner");
      return;
    }

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadResult = await uploadBannerImage(imageFile);
        imageUrl = uploadResult.imageUrl;
      }

      const bannerData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        image: imageUrl,
        displayOrder: formData.displayOrder,
        status: formData.status,
      };

      if (editingId) {
        await updateBanner(editingId, bannerData);
        alert("Cập nhật banner thành công!");
      } else {
        await createBanner(bannerData);
        alert("Thêm banner thành công!");
      }

      resetForm();
      loadBanners();
    } catch (error) {
      alert("Lưu banner thất bại.");
      console.error(error);
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);

    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      image: banner.image,
      displayOrder: banner.displayOrder,
      status: banner.status,
    });

    setPreviewImage(banner.image);
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa banner này?");

    if (!confirmDelete) return;

    try {
      await deleteBanner(id);
      alert("Xóa banner thành công!");
      loadBanners();
    } catch (error) {
      alert("Xóa banner thất bại.");
      console.error(error);
    }
  };

  return (
    <main className="admin-banners">
      <div className="admin-banners-container">
        <div className="admin-banners-header">
          <div>
            <p className="admin-banners-label">Admin</p>
            <h1>Quản lý Banner</h1>
            <p>
              Thêm, sửa, xóa banner hiển thị ở HeroSlider ngoài trang chủ.
            </p>
          </div>

          <div className="admin-banners-links">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/projects">Quản lý dự án</Link>
          </div>
        </div>

        <form className="admin-banners-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Cập nhật banner" : "Thêm banner mới"}</h2>

          <div className="admin-banners-grid">
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề banner"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subtitle"
              placeholder="Phụ đề banner"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="displayOrder"
              placeholder="Thứ tự hiển thị"
              value={formData.displayOrder}
              onChange={handleChange}
              min="1"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Hiển thị">Hiển thị</option>
              <option value="Ẩn">Ẩn</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Mô tả banner"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <div className="admin-banners-upload">
            <label>Ảnh banner</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview banner"
                className="admin-banners-preview"
              />
            )}
          </div>

          <div className="admin-banners-actions">
            <button type="submit">
              {editingId ? "Lưu thay đổi" : "Thêm banner"}
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
          <div className="admin-banners-empty">
            <h2>Đang tải banner...</h2>
          </div>
        ) : banners.length === 0 ? (
          <div className="admin-banners-empty">
            <h2>Chưa có banner nào</h2>
            <p>Hãy thêm banner đầu tiên bằng form phía trên.</p>
          </div>
        ) : (
          <div className="admin-banners-list">
            {banners.map((banner) => (
              <article className="admin-banners-card" key={banner.id}>
                <img src={banner.image} alt={banner.title} />

                <div className="admin-banners-card-content">
                  <span>{banner.status}</span>
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle}</p>
                  <small>Thứ tự: {banner.displayOrder}</small>

                  <div className="admin-banners-card-actions">
                    <button onClick={() => handleEdit(banner)}>Sửa</button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(banner.id)}
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

export default AdminBanners;