import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

// export const { user } = useSelector((state) => state.user);

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  
  const profileObj = {
    name: "Profile",
    path: `/user/profile/${user?._id}`,
    icon: "fa-solid fa-user",
  }

  userMenu[3] = profileObj
  adminMenu[3] = profileObj

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull");
    navigate("/login");
  };

  // ------------------Doctor Menu------------------
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointmments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Details",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid  fa-circle-info",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    }
  ];
  // ----------------Doctor Menu----------------

  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;

                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to={`/user/profile/${user?._id}`} className="username">
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
