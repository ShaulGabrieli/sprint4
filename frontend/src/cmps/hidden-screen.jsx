


export function HiddenScreen (props) {

    function onClosePopup() {
        props.setOpenOrders(false)
        props.setOpenLogin(false)
        props.setOpenJoin(false)
    }

    return <div className="hidden-screen" onClick={()=> onClosePopup()}></div>
}