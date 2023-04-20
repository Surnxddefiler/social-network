import Post from "./post";
import React from 'react';
import {saveProfileThunk,savePhotoThunk ,changeInputAction, addPostAction, userProfileAction, profileThunk, statusThunk, updateStatusThunk } from "../../redux/profile-reducer.ts";
import Profile from "./profile";
import axios from "axios";
import {connect} from "react-redux"
import { Navigate } from "react-router-dom";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { Redirect } from "../../hoc/redirect";
import { compose } from "redux";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};
class ProfileClass extends React.Component{
    componentDidMount(){
        
        let userId = this.props.params.userId;
        if(!userId){
            userId= this.props.authorized;
        }
        this.props.profileThunk(userId)
        this.props.statusThunk(userId)
    }
    render(){
        return(
            <Profile owner={!this.props.params.userId} {...this.props} status={this.props.status} updateStatusThunk={this.props.updateStatusThunk} savePhoto={this.props.savePhotoThunk}
            saveProfile={this.props.saveProfileThunk}/>
        )
    }
}
// let RedirectComponent = Redirect(ProfileClass)


let mapState=(state)=>{
    return{
    profilePage: state.profilePage,
    status: state.profilePage.status,
    authorized: state.auth.id
}
}

export default compose( connect(mapState, { // вместо диспача
    userProfile: userProfileAction,
    changeInput: changeInputAction,
    addPost: addPostAction,
    profileThunk,
    statusThunk,
    updateStatusThunk,
    savePhotoThunk,
    saveProfileThunk
}) ,withRouter,Redirect)(ProfileClass);