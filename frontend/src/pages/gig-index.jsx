import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadGigs } from "../store/gig.actions.js";
import { useSearchParams } from "react-router-dom";
import { gigService } from "../services/gig.service.local.js";
import { GigPreview } from "../cmps/gig-preview.jsx";
import { GigFilter } from "../cmps/gig-filter.jsx";
import { setFilter } from "../store/gig.actions.js";

export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs);
  const filterBy = useSelector(
    (storeState) => storeState.filterModule.filterBy
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilterBy = gigService.getFilterFromSearchParams(searchParams);

  useEffect(() => {
    onLoadGigs();
  }, [filterBy]);

  async function onLoadGigs() {
    try {
      await loadGigs(filterBy);
      console.log("Loaded successfully");
    } catch (err) {
      console.log("Something went wrong", err);
      throw err;
    }
  }

  function onSetFilter(filterBy) {
    setSearchParams(filterBy);
    setFilter(filterBy);
  }

  return (
    <div className="gig-index main-container">
      {/* <section className="top-bars">
        <div className="top-left-bar">
          <h1>Hi User</h1>
          <p>
            We create opportunities for anyone in the world to build their
            business, brand, or dream.{" "}
          </p>
          <Link to={'/gig/edit'}><button>Become a seller</button></Link>
        </div>
        <div className="top-right-bar">
          <p> Don't Just Dream, Do</p>
        </div>
      </section> */}
      <main>
        <GigFilter filterBy={queryFilterBy} onSetFilter={onSetFilter} />

        <h2>Most popular Gigs</h2>
        <ul className="gig-list">
          {gigs.map((gig, idx) => (
            <GigPreview id={idx} gig={gig} />
          ))}
        </ul>
      </main>
    </div>
  );
}
