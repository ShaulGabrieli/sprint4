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
    const [isReadyPublish, setIsReadyPublish] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(false)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!gigId) return
        gigService.getById(gigId).then(setGigToEdit)
    }, [])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setGigToEdit((prevGig) => ({ ...prevGig, [field]: value }))
    }

    function handleChangeTags(tags) {
        const selectedTags = []
        tags.forEach((tag) => {
            let { value } = tag
            selectedTags.push(value)
        })
        console.log('selectedTags', selectedTags)
        setGigToEdit((prevGig) => ({ ...prevGig, tags: selectedTags }))
    }

    function handleChangeDaysToDo(days) {
        let { value } = days
        setGigToEdit((prevGig) => ({ ...prevGig, daysToMake: +value }))
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
        setIsImgLoading(true)
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
            setIsImgLoading(false)
            setIsReadyPublish(true)
        } catch (err) {
            console.error(err)
        }
    }
    const categoryOptions = [
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
    const doneDayOptions = [
        { value: '1', label: '1 days Delivery' },
        { value: '2', label: '2 days Delivery' },
        { value: '3', label: '3 days Delivery' },
        { value: '4', label: '4 days Delivery' },
        { value: '5', label: '5 days Delivery' },
        { value: '6', label: '6 days Delivery' },
        { value: '7', label: '7 days Delivery' },
        { value: '14', label: '14 days Delivery' },
        { value: '21', label: '21 days Delivery' },
        { value: '30', label: '30 days Delivery' },
        { value: '45', label: '45 days Delivery' },
        { value: '60', label: '60 days Delivery' },
        { value: '75', label: '75 days Delivery' },
        { value: '90', label: '90 days Delivery' },
    ]
    return (
        <section className='gig-edit full'>
            <form onSubmit={onAddGig}>
                <section className='edit-section'>
                    <div class='gig-edit-title'>
                        <h1>Gig title</h1>
                        <p>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                    </div>
                    <div class='gig-title-desc'>
                        <textarea className='text-input-area' type='text' name='title' maxlength='80' value={gigToEdit.title} onChange={handleChange}></textarea>
                    </div>
                    <div class='gig-category'>
                        <h1>Category</h1>
                        <p>Choose the categories that are most suitable for your Gig.</p>
                    </div>
                    <div class='gig-selectors'>
                        <Select
                            isMulti
                            name='tags'
                            options={categoryOptions}
                            theme={(theme) => ({ ...theme, borderRadius: 4, colors: { ...theme.colors, primary: 'black' } })}
                            classNamePrefix='select'
                            onChange={handleChangeTags}
                        />
                    </div>

                    <div className='desc-info'>
                        <h1>Description</h1>
                        <p>Briefly Describe Your Gig</p>
                    </div>
                    <div className='gig-description'>
                        <textarea className='text-input-area' type='search' pattern='.{50,1200}' name='description' value={gigToEdit.description} onChange={handleChange}></textarea>
                    </div>

                    <div className='gig-price'>
                        <h1>Scope & Pricing</h1>
                        <label htmlFor='gig-price'>Price: </label>
                        <input className='price-input' id='gig-price' type='number' name='price' value={gigToEdit.price} onChange={handleChange}></input>
                    </div>
                    <div className='gig-done-days-container'>
                        <label htmlFor='gig-done-days'>Delivery Time </label>
                        <Select
                            name='tags'
                            options={doneDayOptions}
                            theme={(theme) => ({ ...theme, borderRadius: 4, colors: { ...theme.colors, primary: 'black' } })}
                            classNamePrefix='select'
                            onChange={handleChangeDaysToDo}
                        />
                    </div>
                    <div className='gallery-info'>
                        <h1>Showcase Your Services In A Gig Gallery</h1>
                        <p>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
                    </div>
                    <div className='gallery-upload'>
                        <input onChange={uploadImg} type='file' />
                        <h1>Images (up to 3)</h1>
                        <p>Get noticed by the right buyers with visual examples of your services.</p>
                    </div>
                    <div className='about-info'>
                        <h1>About you</h1>
                        <p>A few words about you expirience.</p>
                    </div>
                    <div className='about-inputs'>
                        <label htmlFor='about-info'>About you:</label>
                        <input className='text-input' name='about' id='about-info' onChange={handleChange} type='text' />
                        <label htmlFor='about-country'>Country:</label>
                        <input className='text-input' name='country' id='about-country' onChange={handleChange} type='text' />
                    </div>
                    <button type='submit' className='save-btn' disabled={!isReadyPublish}>
                        Publish {isImgLoading && <i className='fa fa-spinner fa-spin'></i>}
                    </button>
                </section>
            </form>
        </section>
    )
}
