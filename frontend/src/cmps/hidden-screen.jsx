


export function HiddenScreen (props) {

    function onClosePopup() {
        props.setOpenOrders(false)
    }

    return <div className="hidden-screen" onClick={()=> onClosePopup()}>{props.children}</div>
}