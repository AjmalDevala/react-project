import React from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {user}=useSelector((state)=> state.user)
  const navigate =useNavigate()
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
   
    
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name:"Users",
      path:"/admin/userslist",
      icon:"ri-user-line"
    },
  
    // {
    //   name:"Profile",
    //   path:"/profile",
    //   icon:"ri-user-line"
    // }
    
   
  ]

  const menuToBeRendered = user?.isAdmin? adminMenu : userMenu;
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">MENU</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}> </i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
                  className={`d-flex menu-item`} onClick={()=>{
                    localStorage.clear();
                    navigate('/login')
                  }}
                >
                  <i className='ri-logout-circle-line'> </i>
                  {!collapsed && <Link to='/login'>Logout</Link>}
                </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
              
            )} 
            <h4>
            Home | Profile
            </h4>
            <div className="d-flex align-items-center px-4">
              <i className="ri-notification-line header-action-icon px-2"></i>
              <Link className="anchor" to='/profile'>{user?.name}</Link>

            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
