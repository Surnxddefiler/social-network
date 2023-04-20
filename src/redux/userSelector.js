export const userSelector=(state)=>{
    return state.userPage.userData
}
export const pageSelctor=(state)=>{
    return state.userPage.pageSize
}
export const totalSelctor=(state)=>{
    return state.userPage.totalUsers
}
export const currentSelctor=(state)=>{
    return state.userPage.current
}
export const fetchingSelctor=(state)=>{
    return state.userPage.fetching
}
export const progressSelctor=(state)=>{
    return state.userPage.progress
}