import { type } from "os";
import { userApi } from "../API/api";

type initialStateType={
    userData: { id: number, followed: boolean, name: string, status: string }[],
    pageSize: number,
    totalUsers: number,
    current:  number,
    fetching: boolean,
    progress: []
}

let initialState: initialStateType = {
    userData: [],
    pageSize: 5,
    totalUsers: 0,
    current: 1,
    fetching: false,
    progress: []
}
const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                userData: state.userData.map((e) => {
                    if (e.id === action.userId) {
                        return { ...e, followed: true }
                    }
                    return e
                })

            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                userData: state.userData.map(e => {
                    if (e.id === action.userId) {
                        return { ...e, followed: false }
                    }
                    return e
                })

            }
        }
        case 'SET_USER': {
            return { ...state, userData: action.userData }
        }
        case 'SET_PAGE': {
            return { ...state, current: action.current }
        }
        case 'SET_PAGE': {
            return { ...state, current: action.current }
        }
        case 'SET_TOTAL': {
            return { ...state, totalUsers: action.totalUsers }
        }
        case 'SET_FETCHING': {
            return { ...state, fetching: action.fetching }
        }
        case 'SET_PROGRESS': {
            return {
                ...state, progress: action.fetching
                    ? [...state.progress, action.userId]
                    : state.progress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}

export const followAction = (userId) => {
    return {
        type: 'FOLLOW', userId
    }
}
export const unfollowAction = (userId) => {
    return {
        type: 'UNFOLLOW', userId
    }
}
export const userAction = (userData) => {
    return {
        type: 'SET_USER', userData
    }
}
export const pageAction = (current) => {
    return {
        type: 'SET_PAGE', current
    }
}
export const totalUserCountAction = (totalUsers) => {
    return {
        type: 'SET_TOTAL', totalUsers: totalUsers
    }
}
export const fetchingAction = (fetching) => {
    return {
        type: 'SET_FETCHING', fetching
    }
}
export const progressAction = (fetching, userId) => {
    return {
        type: 'SET_PROGRESS', fetching, userId
    }
}
export const getUsersThunk = (current, pageSize) => {
    return (dispatch) => {
        dispatch(fetchingAction(true))
        userApi.getUsers(current, pageSize).then(data => {
            dispatch(fetchingAction(false))
            dispatch(userAction(data.items))
            dispatch(totalUserCountAction(data.totalCount))
        })
    }
}
export const followThunk = (userId) => {
    return (dispatch) => {
        dispatch(progressAction(true, userId))
        userApi.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followAction (userId))
                }
                dispatch( progressAction(false, userId))
            })
    }
}
export const unfollowThunk = (userId) => {
    return (dispatch) => {
        dispatch(progressAction(true, userId))
        userApi.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowAction (userId))
                }
                dispatch( progressAction(false, userId))
            })
    }
}
export default userReducer