import shaiba from './aside.module.css'
import {NavLink} from "react-router-dom";
const Aside = () =>{
    return( //импорт имени с другого сиєсєс файла
      <aside className={shaiba.aside}>
      <div><NavLink to="/profile" className = { navData => navData.isActive ? shaiba.active : shaiba.item }>profile</NavLink></div>
      <div><NavLink to="/message" className = { navData => navData.isActive ? shaiba.active : shaiba.item }>messages</NavLink></div>
      <div><NavLink to="/users" className = { navData => navData.isActive ? shaiba.active : shaiba.item }>users</NavLink></div>
      <div> news</div>
      <div> music</div>
      <div> settings</div>
    </aside>
    )
}
export default Aside;