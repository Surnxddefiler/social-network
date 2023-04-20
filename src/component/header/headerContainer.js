
import React from 'react';
import Header from './header';
import axios from "axios";
import { connect } from 'react-redux';
import { authAction, authThunk, logoutThunk } from '../../redux/auth-reducer.ts';

class headerClass extends React.Component{
  componentDidMount(){
    this.props.authThunk()
  }
  render(){
    return(
      <Header {...this.props}/>
    )
  }
}
const mapState=(state)=>({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

 let headerContainer= connect(mapState, {
  authMe: authAction,
  authThunk,
  logoutThunk
}) (headerClass);
export default headerContainer