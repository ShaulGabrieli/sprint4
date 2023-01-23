import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.local'
import { addGig } from '../store/gig.actions.js'

export function GigEdit() {
    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!gigId) return
        gigService.getById(gigId).then(setGigToEdit)
    }, [])

    function handleChange( {target} ) {
       
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setGigToEdit((prevGig) => ({ ...prevGig, [field]: value }))
    }

    function handleChangeTags( tags ) {
        const selectedTags = []
       console.log('gigToEdit', tags);
       tags.forEach(tag => {
        let { value } = tag
        selectedTags.push(value)
       });
        console.log('selectedTags', selectedTags);
        setGigToEdit((prevGig) => ({ ...prevGig, tags: selectedTags }))
    }

    async function onAddGig(ev) {
        console.log('gigToEdit', gigToEdit)
        ev.preventDefault()
        try {
            const savedGig = await addGig(gigToEdit)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
            navigate('/gig')
        } catch (err) {
            showErrorMsg('Cannot add gig')
            throw err
        }
    }

    const uploadImg = async (event) => {
        //Defining our variables
        const CLOUD_NAME = 'dyfo5gyda'
        const UPLOAD_PRESET = 'otvk6yqj'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData()

        //Bulding the request body
        FORM_DATA.append('file', event.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)
        // Sending a post method request to Cloudinarys API
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA,
                mode: 'cors',
            })
            const elImg = document.createElement('img')
            const { url } = await res.json()
            console.log('url', url)
            const urls = gigToEdit.imgUrls
            urls.push(url)
            setGigToEdit((prevGig) => ({ ...prevGig, imgUrls: urls }))
            // elImg.src = url
            // document.body.append(elImg)
        } catch (err) {
            console.error(err)
        }
    }
    const options = [
        { value: 'graphics design', label: 'Graphics & Design' },
        { value: 'digital marketing', label: 'Digital Marketing' },
        { value: 'writing translation', label: 'Writing & Translation' },
        { value: 'video animation', label: 'Video & Animation' },
        { value: 'music audio', label: 'Music & Audio' },
        { value: 'programming tech', label: 'Programming & Tech' },
        { value: 'business', label: 'Business' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'trending', label: 'Trending' },
    ]
    return (
        <section className='gig-edit full'>
            <form onSubmit={onAddGig}>
                <section className='edit-section'>
                    <div class='gig-title'>
                        <h1>Gig title</h1>
                        <p>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                    </div>
                    <div class='gig-description'>
                        <input className='text-input' type='text' name='title' maxlength='80' value={gigToEdit.title} onChange={handleChange}></input>
                    </div>
                    <div class='gig-category'>
                        <h1>Category</h1>
                        <p>Choose the category and sub-category most suitable for your Gig.</p>
                    </div>
                    <div class='gig-selectors'>
                        <div className='categories'>
                            <input placeholder='SELECT A CATEGORY' className='category-select' type='select'></input>
                            <input placeholder='SELECT A SUBCATEGORY' className='category-select' type='select'></input>
                        </div>
                    </div>
                    <div class='gig-tags'>
                        <h1>Search tags</h1>
                        <p>Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.</p>
                    </div>
                    <div class='gig-keywords'>
                        <h1>Positive keywords</h1>
                        <p>Enter search terms you feel your buyers will use when looking for your service.</p>
                        <input type='text' name='tags' value={gigToEdit.tags} onChange={handleChange}></input>
                        <p>5 tags maximum. Use letters and numbers only.</p>
                    </div>
                </section>

                <button className='save-btn'>Save & continue</button>

                {/* ////////////////////////next page//////////////////////////////////// */}

                <div className='description-section'>
                    <Select isMulti name='tags' options={options} className='basic-multi-select' classNamePrefix='select' onChange={handleChangeTags}/>

                    <h1>Description</h1>
                    <hr />
                    <p>Briefly Describe Your Gig</p>
                    <hr />
                    <div class='gig-description'>
                        <input className='text-input' type='search' pattern='.{50,1200}' name='description' value={gigToEdit.description} onChange={handleChange}></input>
                    </div>
                    <div className='gig-price'>
                        <h1>Scope & Pricing</h1>
                        <hr />
                        <label htmlFor='gig-price'>Price: </label>
                        <input id='gig-price' type='number' name='price' value={gigToEdit.price} onChange={handleChange}></input>
                        <label htmlFor='gig-time'>Delivery Time </label>
                        <select id='gig-time' type='select'>
                            <option name='daysToMake' value='1'>
                                1 days Delivery
                            </option>
                            <option name='daysToMake' value='2'>
                                2 days Delivery
                            </option>
                            <option name='daysToMake' value='3'>
                                3 days Delivery
                            </option>
                            <option name='daysToMake' value='4'>
                                4 days Delivery
                            </option>
                            <option name='daysToMake' value='5'>
                                5 days Delivery
                            </option>
                            <option name='daysToMake' value='10'>
                                10 days Delivery
                            </option>
                            <option name='daysToMake' value='14'>
                                14 days Delivery
                            </option>
                            <option name='daysToMake' value='21'>
                                21 days Delivery
                            </option>
                            <option name='daysToMake' value='30'>
                                30 days Delivery
                            </option>
                            <option name='daysToMake' value='45'>
                                45 days Delivery
                            </option>
                            <option name='daysToMake' value='60'>
                                60 days Delivery
                            </option>
                            <option name='daysToMake' value='75'>
                                75 days Delivery
                            </option>
                            <option name='daysToMake' value='90'>
                                90 days Delivery
                            </option>
                        </select>
                        <button className='save-btn'>Save & continue</button>
                    </div>
                </div>
                {/* ////////////////////////next page//////////////////////////////////// */}

                <div className='gallery-section'>
                    <h1>Showcase Your Services In A Gig Gallery</h1>
                    <p>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
                    <hr />
                    <input onChange={uploadImg} type='file' />
                    <h2>Images (up to 3)</h2>
                    <p>Get noticed by the right buyers with visual examples of your services.</p>
                </div>
                <button type='submit' className='save-btn'>
                    Publish
                </button>
            </form>
        </section>
    )
}
