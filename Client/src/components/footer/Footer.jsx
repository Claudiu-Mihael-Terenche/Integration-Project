import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const categoryUrls = {
    "Game Development": "/gigs?cat=gamedev",
    "Interior Design": "/gigs?cat=design",
    "E-commerce": "/gigs?cat=ecommerce",
    "Animation & Cartoon": "/gigs?cat=animation",
    "Digital Marketing": "/gigs?cat=marketing",
    "Music & Audio": "/gigs?cat=music",
    "Social Media Marketing": "/gigs?cat=social",
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            {Object.keys(categoryUrls).map((category) => (
              <Link to={categoryUrls[category]} key={category}>
                <span>{category}</span>
              </Link>
            ))}
          </div>
          <div className="item">
            <h2>About</h2>
            <Link to="/about">About us</Link>
            <Link to="/tos">Terms of Service</Link>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>OfferMe</h2>
            <span>© OfferMe International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="link">
              <img src="/src/img/coin.png" alt="" />
              <span>CAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
