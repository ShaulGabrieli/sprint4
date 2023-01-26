import { useState, useEffect } from 'react'
import Select from 'react-select'
import { daysToMakeOptions } from './global-const/global-const'
export function GigFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function handleChangeDaysToMake(days) {
        let { value } = days
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, daysToMake: +value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section>
            <form className=' filter-below-header flex space-between' onSubmit={onSubmitFilter}>
                <h3>Filter by...</h3>
                <label htmlFor='daysToMake'></label>
                <h4>Delivey Time:</h4>
                <div className='flex'>
                    <Select
                        id='daysToMake'
                        name='daysToMake'
                        options={daysToMakeOptions}
                        theme={(theme) => ({ ...theme, borderRadius: 4, colors: { ...theme.colors, primary: 'black' } })}
                        classNamePrefix='select'
                        onChange={handleChangeDaysToMake}
                    />
                    {/* <select
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
          </select> */}
                </div>
                <h4>Budget:</h4>

                <input name='price' id='max-price' placeholder='Max Price' value={filterByToEdit.price} onChange={handleChange} />
            </form>
        </section>
    )
}
