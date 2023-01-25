import { useNavigate } from "react-router-dom"



export function PopupMenu(props) {
    const navigate= useNavigate()
    console.log('props.children',props.children )
    return (
        <section className="popup-menu">
            {props.top}
            {props.children}
            
           
        </section>
    )
}
