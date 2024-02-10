import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../index.css';
import React from "react";
import { Footer } from './component.footer';


export function Layout() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwtToken");
  const handleLogoutClick = async () => {
        await localStorage.removeItem("jwtToken");
        await localStorage.removeItem("userId");
        await localStorage.removeItem("username");
        await localStorage.removeItem("jwtToken");
        await localStorage.removeItem("email");
        await localStorage.removeItem("isAdmin");
        console.log("logout....")
        navigate("home");
  }
  const handleLoginClick = () => {
    // Add any logic you need before navigating
    navigate('/login');
  };

  const handleRegisterClick = () => {
    // Add any logic you need before navigating
    navigate('/register');
  };

   // Check if the current route is '/login' or '/register'
   const isLoginPage = window.location.pathname === '/login';
   const isRegisterPage = window.location.pathname === '/register';
 
  return (
    <>
    {isLoginPage || isRegisterPage ? null : (
      <section className="topbar bg-dark py-1 border-bottom border-dark">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-white">
              Directly contact us for reservation: <a href="tel:1234567890" className="text-white text-decoration-none">1234567890</a>
            </p>
          </div>
        </div>
      </section>
    )}
    {isLoginPage || isRegisterPage ? null : (
      <section className="header">
        <nav className="navbar navbar-expand-lg bg-transparent">
          <img src="./img/logo.png" className="img-fluid logo" alt="" />
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item ms-4">
                  <NavLink to="/home" className="nav-link text-dark" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink to="/about" className="nav-link text-dark" activeClassName="active">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink to="/rooms" className="nav-link text-dark" activeClassName="active">
                    Our Rooms
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink to="/reservation" className="nav-link text-dark" activeClassName="active">
                    Reservation
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink to="/contact" className="nav-link text-dark" activeClassName="active">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
        {isLoggedIn ? (
          <>
          <div className="dropdown">

              <a className="nav-link dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {localStorage.getItem("username")}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <NavLink to="/bookings" className="dropdown-item">All Bookings</NavLink>
                <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                <NavLink onClick={handleLogoutClick} className="ml-4" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                Logout
              </NavLink>
              </div>
          </div>
          </>
        ) : (
          <NavLink to="/login" onClick={handleLoginClick} className="nav-link text-dark" activeClassName="active">
            Login
          </NavLink>
        )}
      </li>
      <li className="nav-item ms-4">
        {isLoggedIn ? (
          <></>
        ) : (
          <NavLink to="/register" onClick={handleRegisterClick} className="nav-link text-dark" activeClassName="active">
            Register
          </NavLink>
        )}
      </li>

              </ul>
            </div>
          </div>
        </nav>
      </section>
    )}
      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
