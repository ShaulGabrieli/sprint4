import { useState, useEffect } from "react";
import Select from "react-select";

export function GigFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  // const [selectedOption, setSelectedOption] = useState(null);

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

  // const daysToMakeOptions = [
  //   { value: 1, label: "Express 24H" },
  //   { value: 3, label: "Up to 3 days" },
  //   { value: 7, label: "Up to 7 days" },
  //   { value: Infinity, label: "Anytime" },
  // ];

  return (
    <section>
      <form className="flex space-between" onSubmit={onSubmitFilter}>
        <h3>Filter by...</h3>
        <label htmlFor="daysToMake"></label>
        <h4>Delivey Time:</h4>
        <div className="flex">
          {/* <Select
            name="daysToMake"
            id="filter-select"
            value={filterByToEdit.daysToMake}
            onChange={handleChange}
            options={daysToMakeOptions}
          /> */}
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
