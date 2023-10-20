import { Link, NavLink } from "react-router-dom";
import { menu } from "./MenuData";

const Menu = () => {
  // Logout
  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aID");
    window.location.href = "/";
  };

  return (
    <>
      <div className="logo">
        <img src="/img/logo.png" alt="" />
        <img src="/favicon.ico" alt="" />
      </div>

      <div className="menu">
        {menu.map((item) => (
          <NavLink to={item.path} className="listItem" key={item.id}>
            <i className={item.icon}></i>
            <span className="listItemTitle">{item.title}</span>
          </NavLink>
        ))}
        <Link className="listItem" to="#" onClick={() => logout()}>
          <i className="ri-logout-circle-r-line"></i>
          <span className="listItemTitle">Logout</span>
        </Link>
      </div>
    </>
  );
};

export default Menu;
