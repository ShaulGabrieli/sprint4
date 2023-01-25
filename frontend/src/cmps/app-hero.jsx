import { useEffect, useState } from "react";

export function AppHero() {
  const [imgToDisplay, setImgToDisplay] = useState(1);
  const [heroTextToDisplay, setHeroTextToDisplay] = useState(
    "Moon, Marketing Expert"
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
            return (prev = 1);
          });
        }
        prevImg += 1;
        heroTextSwitch(prevImg);

        return prevImg;
      });
    }, 7000);
  }

  function heroTextSwitch(heroImg) {
    switch (heroImg) {
      case 1:
        setHeroTextToDisplay("Moon, Marketing Expert");
        break;
      case 2:
        setHeroTextToDisplay("Rikita, Shoemaker and Desighner");
        break;
      case 3:
        setHeroTextToDisplay("Zack, Bar Owner");
        break;
      case 4:
        setHeroTextToDisplay("Gabrielle, Video Editor");
        break;
      case 5:
        setHeroTextToDisplay("Andrea, Fasion Designer");
        break;
      default:
    }
  }

  return (
    <section className="hero-container main-container full flex">
      <div
        className={`img-container${imgToDisplay}
} full main-container flex`}
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
        </div>
        <div className="hero-name flex">
          <p>{heroTextToDisplay}</p>
        </div>
      </div>
    </section>
  );
}
