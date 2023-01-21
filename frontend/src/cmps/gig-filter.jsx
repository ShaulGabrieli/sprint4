import { useState, useEffect } from "react";
import { gigService } from "../services/gig.service.local.js";

export function GigFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(
    gigService.getDefaultFilter()
  );

  console.log("filterByToEdit", filterByToEdit);

  useEffect(() => {
    onSetFilter(filterByToEdit);
    console.log(filterByToEdit, "filterByToEdit");
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  return (
    <section>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="gigTitle"></label>
        <input
          className="search-box"
          type="text"
          id="gigTitle"
          name="title"
          placeholder="What service are you looking for today?"
          value={filterByToEdit.title}
          onChange={handleChange}
        />
        <div className="search-icon-box">
          <span className="material-symbols-outlined search-icon">search</span>
        </div>

        <label htmlFor="daysToMake"></label>
        <select
          name="daysToMake"
          id="filter-select"
          value={filterByToEdit.daysToMake}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value={1}>Express 24H</option>
          <option value={3}>Up to 3 days</option>
          <option value={7}>Up to 7 days</option>
          <option value={Infinity}>Anytime</option>
        </select>
        <input
          name="price"
          id="max-price"
          placeholder="Max Price"
          value={filterByToEdit.price}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}
