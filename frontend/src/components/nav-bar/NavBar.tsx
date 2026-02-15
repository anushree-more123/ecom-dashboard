import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useState } from "react";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate(routes.LOGIN);
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-left">
          <Link to={routes.PRODUCTS}>Products</Link>
          <Link to={routes.ADD}>Add Products</Link>
          <Link to={routes.ADD}>Update Products</Link>
        </div>

        <div className="nav-right">
          <div className="avatar" onClick={() => setShowModal((prev) => !prev)}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {showModal && (
            <div className="logout-modal">
              <p>Are you sure you want to logout?</p>
              <div className="modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
