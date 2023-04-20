import style from './chat.module.css'
import React from "react";
import message from "../message";
const Chat = (props) =>{
    return(
        <div className={style.chat}>
            <div className={style.person__message}>
                <img className={style.ava} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s" alt="" />
                <div className={style.person__text}>{props.personText}</div>
            </div>
        </div>
    )
}
export default Chat;