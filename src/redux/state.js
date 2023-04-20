import chatReducer from "./chat-reducer"
import profileReducer from "./profile-reducer"

let store={
    _state:{
        profilePage:{
        postData:[
            {id:1, message: "Сиськи орисы c гавняшкай"},
            {id:2, message: "Сиськи орисы c какишем"}
        ],
            postInput: "haizenberg"
        },
        chatPage:{
        peopleData:[
            { id: 1 ,name: "Пахан с днепра", lastMessage:"не"},
            { id: 2 ,name: "Плесень", lastMessage:"да"}
        ],
        chatData:[
            { id: 1 , personText: "Пошел нахуй"}
        ],
        chatInput: 'haizenberg'
        }
    },
    getState(){
        return this._state
    },
    _rerender(){
    },
    update (func){
        this._rerender= func
    },
    dispatch(action){
    this._state.profilePage=profileReducer(this._state.profilePage, action)
    this._state.chatPage=chatReducer(this._state.chatPage, action)
    this._rerender(this._state)
    }
}


export default store;