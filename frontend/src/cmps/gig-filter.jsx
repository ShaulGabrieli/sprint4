import { useState, useEffect } from "react";

export function GigFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
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
      <form className="flex space-between" onSubmit={onSubmitFilter}>
        <h3>Filter by...</h3>
        <label htmlFor="daysToMake"></label>
        <h4>Delivey Time:</h4>
        <div className="flex">
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
        </div>
        <h4>Budget:</h4>

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
