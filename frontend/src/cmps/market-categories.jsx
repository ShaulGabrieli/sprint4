import routes from "../routes";

import { Link, NavLink } from "react-router-dom";

export function MarketCategories() {
  return (
    <section className="market-categories main-container">
      <h2>Explore the marketplace</h2>
      <ul className="market-place flex clean-list">
        <li>
          <a href="/categories/graphics-design?source=hplo_cat_sec&amp;pos=1">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
              alt="Graphics &amp; Design"
              loading="lazy"
            ></img>
            Graphics &amp; Design
          </a>
        </li>
        <li>
          <a href="/categories/online-marketing?source=hplo_cat_sec&amp;pos=2">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
              alt="Digital Marketing"
              loading="lazy"
            ></img>
            Digital Marketing
          </a>
        </li>

        <li>
          <a href="/categories/writing-translation?source=hplo_cat_sec&amp;pos=3">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
              alt="Writing &amp; Translation"
              loading="lazy"
            ></img>
            Writing &amp; Translation
          </a>
        </li>
        <li>
          <a href="/categories/video-animation?source=hplo_cat_sec&amp;pos=4">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
              alt="Video &amp; Animation"
              loading="lazy"
            ></img>
            Video &amp; Animation
          </a>
        </li>
        <li>
          <a href="/categories/music-audio?source=hplo_cat_sec&amp;pos=5">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
              alt="Music &amp; Audio"
              loading="lazy"
            ></img>
            Music &amp; Audio
          </a>
        </li>
        <li>
          <a href="/categories/programming-tech?source=hplo_cat_sec&amp;pos=6">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
              alt="Programming &amp; Tech"
              loading="lazy"
            ></img>
            Programming &amp; Tech
          </a>
        </li>
        <li>
          <a href="/categories/business?source=hplo_cat_sec&amp;pos=7">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
              alt="Business"
              loading="lazy"
            ></img>
            Business
          </a>
        </li>
        <li>
          <a href="/categories/lifestyle?source=hplo_cat_sec&amp;pos=8">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
              alt="Lifestyle"
              loading="lazy"
            ></img>
            Lifestyle
          </a>
        </li>
        <li>
          <a href="/categories/data?source=hplo_cat_sec&amp;pos=9">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
              alt="Data"
              loading="lazy"
            ></img>
            Data
          </a>
        </li>
        <li>
          <a href="/categories/photography?source=hplo_cat_sec&amp;pos=10">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
              alt="Photography"
              loading="lazy"
            ></img>
            Photography
          </a>
        </li>
      </ul>
      <div className="flex space-evenly">
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
}
