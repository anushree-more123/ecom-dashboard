import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { routes } from "../../routes";

const NavBar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.clear();
    navigate(routes.LOGIN);
  };
  return (
    <div className="nav-container">
      <ul className="nav-ul">
        <li>
          <Link to={routes.PRODUCTS}>Products</Link>
        </li>
        <li>
          <Link to={routes.ADD}>Add Products</Link>
        </li>
        <li>
          <Link to={routes.ADD}>Update Products</Link>
        </li>
        <li>
          <Link onClick={handleLogout} to={routes.LOGIN}>
            Logout
          </Link>
        </li>
        <li>
          <Link to={routes.PROFILE}>Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
