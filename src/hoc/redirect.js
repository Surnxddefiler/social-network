import React from "react"
import { Navigate } from "react-router-dom";
import {connect} from "react-redux"
let mapStateRedirect=(state)=>{
    return{
    isAuth: state.auth.isAuth
}
}
export const Redirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth == false) return <Navigate to={"/Login"} />  // если юзер не зареган
            return <Component {...this.props} />
        }
    }

    let ConnectRedirectComponent= connect(mapStateRedirect)(RedirectComponent)
    return ConnectRedirectComponent
}