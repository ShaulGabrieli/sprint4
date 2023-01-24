export const uploadImgToGig = async (event) => {
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
        return url
    } catch (err) {
        console.error(err)
    }
}
