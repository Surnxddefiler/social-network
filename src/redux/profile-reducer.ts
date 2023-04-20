import { type } from 'os';
import { profileApi } from "../API/api"


let initialState = {
    postData: [
        { id: 1, message: "hi" },
        { id: 2, message: "bob" }
    ],
    profile: null,
    status: "",
    postInput: '',
    photos: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost = {
                id: 5,
                message: action.postInput,
            }
            let stateCopy = { ...state }
            stateCopy.postData = [...state.postData]
            stateCopy.postData.push(newPost)
            return stateCopy;
        }
        case 'UPDATE-POST-TEXT': {
            let stateCopy = { ...state }
            stateCopy.postInput = action.newText
            return stateCopy;
        }
        case 'SET-USER-PROFILE': {
            let stateCopy = { ...state }
            stateCopy.profile = action.profile
            return stateCopy;
        }
        case 'SET-STATUS': {
            let stateCopy = { ...state }
            stateCopy.status = action.status
            return stateCopy;
        }
        case 'SAVE-PHOTO': {
            let stateCopy = { ...state }
            stateCopy.photos = action.photos
            return stateCopy;
        }
        default:
            return state
    }
}
export const addPostAction = (postInput) => {
    return {
        type: 'ADD-POST', postInput
    }
}
export const changeInputAction = (text) => {
    return {
        type: 'UPDATE-POST-TEXT',
        newText: text
    }
}
export const userProfileAction = (profile) => {
    return {
        type: 'SET-USER-PROFILE',
        profile: profile
    }
}
export const statusAction = (status) => {
    return {
        type: 'SET-STATUS',
        status: status
    }
}
export const savePhotoAction = (photos) => {
    return {
        type: 'SAVE-PHOTO',
        photos: photos
    }
}
export const profileThunk = (userId) => { // санки нужны для запросов
    return (dispatch) => {
        profileApi.getProfile(userId)
            .then(response => {
                dispatch(userProfileAction(response.data))
            })
    }
}
export const statusThunk = (userId) => { // санки нужны для запросов
    return (dispatch) => {
        profileApi.getStatus(userId)
            .then(response => {
                dispatch(statusAction(response.data))
            })
    }
}
export const updateStatusThunk = (status) => { // санки нужны для запросов
    return (dispatch) => {
        profileApi.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(statusAction(status))
                }
            })
    }
}
export const savePhotoThunk = (file) => { // санки нужны для запросов
    return (dispatch) => {
        profileApi.savePhoto(file)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(savePhotoAction(file))
                }
            })
    }
}
export const saveProfileThunk = (profile) => { // санки нужны для запросов
    return (dispatch, getState) => {
       const userId= getState().auth.id
        profileApi.saveProfile(profile)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(profileThunk(userId))
                }
            })
    }
}
export default profileReducer