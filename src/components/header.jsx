import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("User");

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };

  
  return (
    <div>
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item d-block d-xl-none">
              <a
                className="nav-link sidebartoggler nav-icon-hover"
                id="headerCollapse"
                href="#"
              >
                <i className="ti ti-menu-2" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-icon-hover" href="#">
                <i className="ti ti-bell-ringing" />
                <div className="notification bg-primary rounded-circle" />
              </a>
            </li>
          </ul>
          <div
            className="navbar-collapse justify-content-end px-0"
            id="navbarNav"
          >
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              {/* Only show Login and Register if user is not logged in */}
              {!user && (
                <>
                  <li>
                    <Link to="/login" className="btn btn-outline-primary me-2">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/register"}
                      className="btn btn-outline-secondary"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* Dropdown and logout button will appear when the user is logged in */}

              {user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link nav-icon-hover"
                    href="javascript:void(0)"
                    id="drop2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/profile/user-1.jpg"
                      alt
                      width={35}
                      height={35}
                      className="rounded-circle"
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="message-body">
                      <Link
                        to="/profile"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        
                        <i className="ti ti-user fs-6" />
                        <p className="mb-0 fs-3">My Profile</p>
                      </Link>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-mail fs-6" />
                        <p className="mb-0 fs-3">My Account</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 dropdown-item"
                      >
                        <i className="ti ti-list-check fs-6" />
                        <p className="mb-0 fs-3">My Task</p>
                      </a>
                      <button
                        onClick={() => handleLogout()}
                        className="btn btn-outline-primary mx-3 mt-2 d-block"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
