import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  loadGigs,
  addGig,
  updateGig,
  removeGig,
  addToCart,
} from "../store/gig.actions.js";
import { Link } from "react-router-dom";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { gigService } from "../services/gig.service.local.js";
import { GigPreview } from "../cmps/gig-preview.jsx";
import { GigFilter } from "../cmps/gig-filter.jsx";

export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs);
  const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter());
  // useEffect(() => {
  //   loadGigs();
  // }, []);
  useEffect(() => {
    loadGigs(filterBy)
      .then(() => {
        console.log("Loaded successfully");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [filterBy]);

  async function onAddGig() {
    const gig = gigService.getEmptyGig();
    gig.vendor = prompt("Vendor?");
    try {
      const savedGig = await addGig(gig);
      showSuccessMsg(`Gig added (id: ${savedGig._id})`);
    } catch (err) {
      showErrorMsg("Cannot add gig");
    }
  }
  function onSetFilter(filterByFromFilter) {
    setFilterBy(filterByFromFilter);
  }
  async function onUpdateGig(gig) {
    const price = +prompt("New price?");
    const gigToSave = { ...gig, price };
    try {
      const savedGig = await updateGig(gigToSave);
      showSuccessMsg(`Gig updated, new price: ${savedGig.price}`);
    } catch (err) {
      showErrorMsg("Cannot update gig");
    }
  }

  async function onRemoveGig(gigId) {
    try {
      await removeGig(gigId);
      showSuccessMsg("Gig removed");
    } catch (err) {
      showErrorMsg("Cannot remove gig");
    }
  }

  function onAddToCart(gig) {
    console.log(`Adding ${gig.vendor} to Gigt`);
    addToCart(gig);
    showSuccessMsg("Added to Gigt");
  }

  function onAddGigMsg(gig) {
    console.log(`TODO Adding msg to gig`);
  }

  return (
    <div className="gig-index">
      <GigFilter onSetFilter={onSetFilter} />

      <section className="top-bars">
        <div className="top-left-bar">
          <h1>Hi User</h1>
          <p>
            We create opportunities for anyone in the world to build their
            business, brand, or dream.{" "}
          </p>
          <button>Become a seller</button>
        </div>
        <div className="top-right-bar">
          <p> Here's what you need for developing your game</p>
        </div>
      </section>
      <main>
        <h2>Most popular Gigs</h2>
        {/* <button onClick={onAddGig}>Add Gig ⛐</button> */}
        <ul className="gig-list">
          {gigs.map((gig, idx) => (
            <GigPreview
              id={idx}
              gig={gig}
              onRemoveGig={onRemoveGig}
              onUpdateGig={onUpdateGig}
              onAddGigMsg={onAddGigMsg}
              onAddToGigt={onAddToCart}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}
