// import hero1 from "../assets/img/hero/hero1.webp";
// import hero2 from "../assets/img/hero2.webp";
// import hero3 from "../assets/img/hero3.webp";
// import hero4 from "../assets/img/hero4.webp";
import { useEffect, useState } from "react";

export function AppHero() {
  const [imgToDisplay, setImgToDisplay] = useState(1)
  const [heroTextToDisplay, setHeroTextToDisplay] = useState(
    "Gabriel, Video Editor"
  );
  useEffect(() => {
    heroImgSwitch();
  }, []);

  function heroImgSwitch() {
    const imgSwitchInterval = setInterval(() => {
      setImgToDisplay((prevImg) => {
        if (prevImg === 5) {
          setImgToDisplay((prev) => {
            heroTextSwitch(1);
            return prev = 1
            })
        }
        prevImg +=1
        heroTextSwitch(prevImg);
        return prevImg;
      });
    }, 7000);
  }

  function heroTextSwitch(heroImg) {
    switch (heroImg) {
      case 1:
        setHeroTextToDisplay("Gabriel, Video Editor");
        break;
      case 2:
        setHeroTextToDisplay("lior");
        break;
      case 3:
        setHeroTextToDisplay("irene");
        break;
      case 4:
        setHeroTextToDisplay("yazan");
        break;
      case 5:
        setHeroTextToDisplay("iron shapira");
        break;
      default:
        setHeroTextToDisplay("Shaula");
    }
  }

  return (
    <section className="hero-container main-container full">
      <div
        className={`img-container${imgToDisplay}
} full main-container`}
      >
        <div className="hero-info ">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="flex align-center search-container">
            <label htmlFor="gigTitle"></label>
            <div className="search-icon-box">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
            </div>
            <input
              className="search-box"
              type="text"
              id="gigTitle"
              // name="title"
              placeholder="Try 'building mobile app'"
            />
            <button>Search</button>
          </div>
          <div className="popular-tags flex">
            <p>Popular:&nbsp;</p>
            <button>Website Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>Video Editing</button>
          </div>
          {/* <p>
            Gabriel,&nbsp; <span> Video Editor</span>
          </p>{" "} */}
          <p className="hero-name">{heroTextToDisplay}</p>
        </div>
      </div>
      {/* <img src={hero1} alt="Logo  " /> */}
      {/*
      <div class="hero-info flex"></div> */}
    </section>
  );
}
// value={filterByToEdit.title} onChange={handleChange}
