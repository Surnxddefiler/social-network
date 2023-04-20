import style from './header.module.css'
import {NavLink} from "react-router-dom";
const Header = (props) =>{
    return(
    <header className="App-header">
    <div className={style.header__container}>
      <img src="https://www.seekpng.com/png/small/769-7695808_telegram-app-icon-logos-of-social-media-apps.png"></img>
      <div className={style.login}>
        {props.isAuth ? <div><div className={style.button}>{props.login}</div> <button onClick={props.logoutThunk}>LOGOUT</button></div> : <NavLink to="/login" className={style.button}>login</NavLink>}
    
    </div>
    </div>
  </header>
    )
}
export default Header;