


export function HiddenScreen (props) {

    function onClosePopup() {
        props.setOpenOrders(false)
        props.setOpenLogin(false)
    }

    return <div className="hidden-screen" onClick={()=> onClosePopup()}>{props.children}</div>
}