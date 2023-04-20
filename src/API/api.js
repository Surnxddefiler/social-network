import axios from "axios";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
})
export const userApi = {
    getUsers(current, pageSize) {
        return instance.get(`users?page=${current}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    follow(userId){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {})
    },
    unfollow(userId){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}
export const headerApi={
    logUser(){
        return instance.get(`auth/me`)// credentails работа с куки
    },
    login(email, password){
        return instance.post('auth/login',{email, password})// если метод пост, значит нужно что-то передать или поставить {}
    },
    logout(){
        return instance.delete('auth/login')
    }
}
export const profileApi={
    getProfile(userId){
        return instance.get(`profile/`+userId)
    },
    getStatus(userId){
        return instance.get(`profile/status/`+userId)
    },
    updateStatus(status){
        return instance.put(`profile/status/`, {status: status})// в статусе лежит новый статус
    },
    savePhoto(photo){
        const formData= new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo/`,formData, {headers:{'Content-Type': 'multipart/form-data'}})// в статусе лежит новый статус
    },
    saveProfile(profile){
        return instance.put(`profile`, profile)
    }
}

