import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <ul className="nav-ul">
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"/add"}>Add Products</Link>
        </li>
        <li>
          <Link to={"/update"}>Update Products</Link>
        </li>
        <li>
          <Link to={"/logout"}>Logout</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
