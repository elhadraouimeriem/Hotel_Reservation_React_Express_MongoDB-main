

import React from "react";
import { useNavigate } from "react-router-dom";
import '../../dash.css';

export function AdminSidebar(){
      
const navigate = useNavigate();

const handleLogoutClick = async () => {
  await localStorage.removeItem("jwtToken");
  await localStorage.removeItem("userId");
  await localStorage.removeItem("username");
  await localStorage.removeItem("jwtToken");
  await localStorage.removeItem("email");
  await localStorage.removeItem("isAdmin");
  console.log("logout....")
  navigate("/admin/signin");
}

return (
      <nav id="navbar">
      <ul class="navbar-items flexbox-col">
        <li class="navbar-logo flexbox-left">
          <a class="navbar-item-inner flexbox">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 1438.88 1819.54">
               <polygon points="925.79 318.48 830.56 0 183.51 1384.12 510.41 1178.46 925.79 318.48"/>
               <polygon points="1438.88 1663.28 1126.35 948.08 111.98 1586.26 0 1819.54 1020.91 1250.57 1123.78 1471.02 783.64 1663.28 1438.88 1663.28"/>
             </svg>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/admin/dashboard' >
            <div class="navbar-item-inner-icon-wrapper flexbox" >
            <i className="fas fa-tachometer-alt white"></i>
            </div>
            <span class="link-text">Dashboard</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/admin/allrooms'>
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-bed white"></i>
            </div>
            <span class="link-text">Rooms</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/admin/allbookings'>
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-calendar-check white"></i>
            </div>
            <span class="link-text">Reservations</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/admin/allusers'>
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-users white"></i>
            </div>
            <span class="link-text">Users</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/admin/profileadmin'>
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-user white"></i>
            </div>
            <span class="link-text">Profile</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" href='/'>
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-globe white"></i>
            </div>
            <span class="link-text">Go to Web Site</span>
          </a>
        </li>
        <li class="navbar-item flexbox-left">
          <a class="navbar-item-inner flexbox-left" onClick={handleLogoutClick} >
            <div class="navbar-item-inner-icon-wrapper flexbox">
            <i className="fas fa-sign-out-alt white"></i>
            </div>
            <span class="link-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
    
);
}