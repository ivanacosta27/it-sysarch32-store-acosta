// Banner.jsx
import React from 'react';
import bannerLogo from '../assets/secretShopBanner.webp';
import './Banner.css';

function Banner() {
  return (
    <div className="banner">
      <img src={bannerLogo} alt="Banner Image" />
    </div>
  );
}

export default Banner;
