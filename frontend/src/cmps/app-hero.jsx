// import hero1 from "../assets/img/hero/hero1.webp";
// import hero2 from "../assets/img/hero2.webp";
// import hero3 from "../assets/img/hero3.webp";
// import hero4 from "../assets/img/hero4.webp";
import { useEffect, useState } from "react";

export function AppHero() {
  const [imgToDisplay, setImgToDisplay] = useState(1);

  useEffect(() => {
    heroImgSwitch();
  }, []);

  // const imgCount = 1;
  function heroImgSwitch() {
    const imgSwitchInterval = setInterval(() => {
      // console.log("chekkk");
      setImgToDisplay((prevImg) => {
        console.log(prevImg, "prevImg");
        // if (imgToDisplay === 4) {
        //   setImgToDisplay((prevImg) => (prevImg = 1));
        // }
        return prevImg + 1;
      });

      console.log("imgToDisplay", imgToDisplay);
    }, 2000);
  }
  return (
    <section className="hero-container main-container full">
      {console.log("imgToDisplay")}
      <div
        className={`img-container${imgToDisplay}
} full`}
      >
        {/* <img src={hero1} alt="Logo  " /> */}
      </div>

      {/*
      <div class="hero-info flex"></div> */}
    </section>
  );
}
