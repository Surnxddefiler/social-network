import style from './people.module.css'
import {NavLink} from "react-router-dom";
const People = (props) =>{  // пропсы
    return(
            <NavLink to={ "/message/"+ props.id}>
            <div className={style.person}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s" alt=""/>
                <div className={style.info}>
                <div className={style.name}>{props.name}</div>
                <div className={style.message}>{props.lastMassage}</div>
                </div>
            </div>
            </NavLink>
    )
}
export default People;