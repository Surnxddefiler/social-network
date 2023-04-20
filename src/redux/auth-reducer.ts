import { type } from "os"
import { headerApi } from "../API/api"
type initialStateType={
    id: number| null,
    email: null| string,
    login: null| string,
    isAuth: boolean
}

let initialState:initialStateType ={
    id: null,
    email: null,
    login: null,
    isAuth: false
}
const authReducer=(state= initialState, action)=>{
    switch(action.type){
        case 'SET-USER-DATA':
            return{
                ...state,
                ...action.data,
                isAuth: true
            }
            case 'RESET_USER_AUTH_DATA':
                return {
                  ...state,
                  ...initialState
                }
        default: 
        return state
    }
}
export const authAction=(userId, email, login)=>{
    return{
      type: 'SET-USER-DATA',
      data: userId, email, login,
     }
}
const resetAuthDataAC = () => {
    return { type: 'RESET_USER_AUTH_DATA' }
  }
export const authThunk=()=>{
    return(dispatch)=>{
        headerApi.logUser().then(response => {
            if (response.data.resultCode ===0){
              dispatch(authAction(response.data.data, true, response.data.data ))
            }
          })
    }
}
export const loginThunk=(email, password)=>{
    return(dispatch)=>{
        headerApi.login(email, password)
        .then(response => {
            if (response.data.resultCode ===0){
                dispatch(authThunk())
            }
          })
    }
}
export const logoutThunk=()=>{
    return(dispatch)=>{
        headerApi.logout()
        .then(response => {
            if (response.data.resultCode ===0){
                dispatch(resetAuthDataAC())
            }
          })
    }
}
export default authReducer