import { Navigate } from "react-router-dom";
import style from './message.module.css'
import Chat from "./chat/chat";
import People from "./people/people";
import React from "react";
import { changeMessageInputAction, addMessageAction } from '../../redux/chat-reducer.ts';
import { Field, Form } from 'react-final-form';
import { maxLengthCreator, requiredField, composeValidators} from "../../validators/validators";
const Message = (props) => {  // пропсы
    // let messageInput = React.createRef()
    // let changeInput = () => {
    //     let text = messageInput.current.value;
    //     props.changeInput(text)
    // }
    // let addMessage = () => {
    //     props.addMessage()
    // }


    let peopleElements = props.chatPage.peopleData.map(el => <People name={el.name} lastMassage={el.lastMessage} ava="" id={el.id} />)
    let chatElements = props.chatPage.chatData.map(el => <Chat personText={el.personText} />)
    return (
        <section className={style.message}>
            <div className={style.people}>
                {peopleElements}
            </div>
            <div className={style.chat}>
                {chatElements}
                <div className={style.input}>
                    <Form onSubmit={(obj) => {props.addMessage(obj.chatInput)}}>
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Field validate={composeValidators(requiredField, maxLengthCreator(5))} name='chatInput'>
                                    {({ input, meta }) => (
                                        <div>
                                        <input type="text" placeholder="login" {...input} />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                                <button className={style.button}>send</button>
                            </form>
                        )
                        }
                    </Form>
                    {/* <input onChange={changeInput} type="text"  ref={messageInput} value={props.chatPage.chatInput} />
                    <button onClick={addMessage} className={style.button}>отправить</button> */}
                </div>
            </div>
        </section>
    )
}
export default Message;