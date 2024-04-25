import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

const Navbar  = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
  
    const { pathname } = useLocation();
  
    const isActive = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", isActive);
      return () => {
        window.removeEventListener("scroll", isActive);
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

    return (
      <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
          <div className="logo">
            <Link className="link" to="/">
              <span className="brand">OfferMe</span>
            </Link>
          </div>
          <div className="links">
            {!currentUser?.isSeller && <span>Become a Seller</span>}
            {currentUser ? (
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
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
                    <Link className="useroption" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="link">Sign in</Link>
                <Link className="link" to="/register">
                  <button>Join</button>
                </Link>
              </>
            )}
          </div>
        </div>               
      </div>
    );
}

export default Navbar;