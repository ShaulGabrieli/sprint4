import React from "react";
import { SellingAd } from "../cmps/selling-ad.jsx";
import { MarketCategories } from "../cmps/market-categories.jsx";

export function HomePage() {
  return (
    <section className="home-page  full">
      <section className="main-container popular-services">
        <h2>Popular professional services</h2>
      </section>

      <SellingAd />
      <MarketCategories />
    </section>
  );
}
