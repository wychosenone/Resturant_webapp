import React from "react";
import restaurantImage from '../Assets/restaurant.jpg';
import chef1Image from '../Assets/Mario and Adrian A.jpg';
import chef2Image from '../Assets/Mario and Adrian b.jpg';

function Home() {
  return (
    <div className="container">
      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <h2 className="mb-4" style={{ fontFamily: 'Verdana', fontSize: '24px', fontStyle: 'italic' }}>
            Welcome to our Restaurant
          </h2>
          <img
            src={restaurantImage}
            className="img-fluid"
            alt="Restaurant"
            loading="lazy"
          />
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <h2 className="text-center mb-3" style={{ fontFamily: 'Verdana', fontSize: '20px', fontStyle: 'italic' }}>
          Our Chefs: Mario and Adrian
        </h2>
        <div className="col-md-6">
          <img
            src={chef1Image}
            className="img-fluid"
            alt="Chef 1"
            loading="lazy"
          />
        </div>
        <div className="col-md-6 mb-5">
          <img
            src={chef2Image}
            className="img-fluid"
            alt="Chef 2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
