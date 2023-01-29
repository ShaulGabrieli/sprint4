import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export function PopupMenu(props) {

    return (
        <section className={`popup-menu-${props.type}`}>
            {props.top}
            {props.children}
            
           
        </section>
    )
}
