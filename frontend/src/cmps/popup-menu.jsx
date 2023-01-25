import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export function PopupMenu(props) {

    useEffect(() => {
        document.body.classList.add('popup-menu-open')
        return () => {
            document.body.classList.remove('popup-menu-open')
        }
    }, [])

    return (
        <section className="popup-menu">
            {props.top}
            {props.children}
            
           
        </section>
    )
}
