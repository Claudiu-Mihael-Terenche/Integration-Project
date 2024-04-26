import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const optionsRef = useRef(null);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const renderRegularUserOptions = () => {
    return (
      <>
        {currentUser.isSeller && (
          <>
            <Link className="useroption" to="/mygigs">
              Gigs
            </Link>
            <Link className="useroption" to="/add">
              Add New Gig
            </Link>
          </>
        )}
        <Link className="useroption" to="/orders">
          Orders
        </Link>
        <Link className="useroption" to="/messages">
          Messages
        </Link>
      </>
    );
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="brand">OfferMe</span>
          </Link>
        </div>
        <div className="links">
          {currentUser?.isAdmin && (
            <Link to="/AdminDashboard" className="link">
              Dashboard
            </Link>
          )}

          {!currentUser?.isSeller && !currentUser?.isAdmin && (
            <span>Become a Seller</span>
          )}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/src/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>

              {open && (
                <div className="options" ref={optionsRef}>
                  {!currentUser?.isAdmin && renderRegularUserOptions()}
                  <Link className="useroption" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
