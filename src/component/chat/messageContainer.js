
import { changeMessageInputAction, addMessageAction } from '../../redux/chat-reducer.ts';
import Message from './message';
import {connect} from "react-redux"
import { Redirect } from '../../hoc/redirect';
import { compose } from 'redux';

let mapState=(state)=>{
    return{
    chatPage: state.chatPage,
    isAuth: state.auth.isAuth
}
}
let mapDispatch=(dispatch)=>{
    return{
    changeInput: (text)=>{
        dispatch(changeMessageInputAction(text))
    },
    addMessage: (obj)=>{dispatch(addMessageAction(obj))}
}
}
// let RedirectComponent = Redirect(Message)
// let MessageContainer = connect(mapState, mapDispatch)(RedirectComponent);

export default compose(connect(mapState, mapDispatch), Redirect)(Message);// вместо 2  переменных
