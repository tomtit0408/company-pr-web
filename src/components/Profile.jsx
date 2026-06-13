import "./Profile.css";

function Profile() {
  return (
    <section id="profile" className="profile">
      <div className="profile-container">
        <div className="profile-image-box">
          <span>CEO</span>
        </div>

        <div className="profile-content">
          <p className="profile-label">Personal Profile</p>
          <h2>Profile cá nhân</h2>
          <p>
            Đây là khu vực giới thiệu người đại diện công ty, bao gồm thông tin
            cá nhân, kinh nghiệm, kỹ năng, vai trò và định hướng phát triển.
          </p>

          <div className="profile-stats">
            <div>
              <strong>5+</strong>
              <span>Dự án</span>
            </div>
            <div>
              <strong>3+</strong>
              <span>Năm kinh nghiệm</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Trách nhiệm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;