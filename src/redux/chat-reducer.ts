import { type } from "os"
type peopleDataType={
    id: number,
    name: string
    lastMessage: string
}
type chatDataType={
    id: number
    personText: string
}

type initialStateType={
    peopleData: peopleDataType[],
    chatData: chatDataType[],
    chatInput: string
}
let initialState: initialStateType={
    peopleData:[
        { id: 1 ,name: "Пахан с днепра", lastMessage:"не"},
        { id: 2 ,name: "Плесень", lastMessage:"да"}
    ],
    chatData:[
        { id: 1 , personText: "не"}
    ],
    chatInput: 'haizenberg'
    
}
const chatReducer=(state=initialState, action)=>{
    let stateCopy={...state}
    stateCopy.chatData=[...state.chatData]
    if(action.type==='UPDATE-MESSAGE-TEXT'){
        stateCopy.chatInput= action.newText 
    }
    else if(action.type==='SEND-MESSAGE'){
        let newMessage={
            id: 5,
            personText: action.chatInput
        }
       stateCopy.chatData.push(newMessage)
    }
    return stateCopy;
}
export const addMessageAction=(chatInput)=>{
    return{
        type: 'SEND-MESSAGE', chatInput
    }
}
export const changeMessageInputAction=(text)=>{
    return{
      type: 'UPDATE-MESSAGE-TEXT',
      newText: text,
    }
}
export default chatReducer