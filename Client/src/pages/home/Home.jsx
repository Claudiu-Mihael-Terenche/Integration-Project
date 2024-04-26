import React from 'react';
import "./Home.scss";
import { Link } from "react-router-dom";
import Featured from '../../components/featured/Featured';
import Slide from '../../components/Slide/Slide';
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";
import TrustedBy from "../../components/trustedBy/TrustedBy";


const Home = () => {
    const categoryUrls = {
        "All": "/gigs",
        "Game Development": "/gigs?cat=gamedev",
        "Interior Design": "/gigs?cat=design",
        "E-commerce": "/gigs?cat=ecommerce",
        "Animation & Cartoon": "/gigs?cat=animation",
        "Digital Marketing": "/gigs?cat=marketing",
        "Music & Audio": "/gigs?cat=music",
        "Social Media Marketing": "/gigs?cat=social",
    };

    return (
        <div className='home'> 
            <Featured />
            <TrustedBy />
            <div className="pills">
                <div className="container">
                    {Object.keys(categoryUrls).map((category) => (
                        <Link className="link menuLink" to={categoryUrls[category]} key={category}>
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
            <Slide slidesToShow={5} arrowsScroll={5}>
                {cards.map((card) => (
                    <CatCard key={card.id} card={card} url={categoryUrls[card.title]} />
                ))}
            </Slide>
            <div className="features">
  <div className="container">
    <div className="item">
      <h1>Unlock a World of Freelance Talent</h1>
      <div className="title">
        <i className="bi bi-check-circle-fill"></i>
        Tailored to Every Budget
      </div>
      <p>
        Discover top-notch services suited to your financial scope. Our project-based pricing ensures you get quality without worrying about hourly rates.
      </p>
      <div className="title">
        <i className="bi bi-check-circle-fill"></i>
        Swift and Quality Deliveries
      </div>
      <p>
        Find the perfect freelancer for your project and kickstart collaboration within minutes. Enjoy efficient, high-quality workmanship.
      </p>
      <div className="title">
        <i className="bi bi-check-circle-fill"></i>
        Secure Payment Transactions
      </div>
      <p>
        Rest assured with our protected payment system. Your funds remain secure until you're completely satisfied with the delivered work.
      </p>
      <div className="title">
        <i className="bi bi-check-circle-fill"></i>
        Round-the-Clock Support
      </div>
      <p>
        Access premium support services around the clock, ensuring your project progresses smoothly at any hour.
      </p>
    </div>
  </div>
</div>
                  
        </div>
    )
}

export default Home;
