import { connect } from "react-redux"
import Users from './Users';
import React from "react";
import {unfollowThunk, followThunk ,fetchingAction, followAction, getUsersThunk, pageAction, progressAction, totalUserCountAction, unfollowAction, userAction } from '../../redux/user-reducer.ts'
import Preloader from "../../assets/preloader/preloader";
import {userApi} from "../../API/api";
import { currentSelctor, fetchingSelctor, pageSelctor, progressSelctor, totalSelctor, userSelector } from "../../redux/userSelector";
class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.getUsersThunk(this.props.current, this.props.pageSize);
        // this.props.isFetching(true)
        // userApi.getUsers(this.props.current, this.props.pageSize).then(data => {
        //         this.props.isFetching(false)
        //         this.props.setUser(data.items)
        //         this.props.totalUserCount(data.totalCount)
        //     })
    }
    pageChange = (p) => {
        this.props.setPage(p)
        this.props.getUsersThunk(p, this.props.pageSize);
    }
    render() {
        return <>
        {this.props.fetching ? <Preloader/> : null}
            <Users totalUsers={this.props.totalUsers} pageSize={this.props.pageSize} current={this.props.current}
                pageChange={this.pageChange} userData={this.props.userData} follow={this.props.follow} unfollow={this.props.unfollow}
                progress={this.props.progress} unfollowThunk={this.props.unfollowThunk}  followThunk={this.props.followThunk} />
        </>
    }
}
let mapState = (state) => {
    return {
        userData: userSelector(state),
        pageSize: pageSelctor(state),
        totalUsers: totalSelctor(state),
        current: currentSelctor(state),
        fetching: fetchingSelctor(state),
        progress: progressSelctor(state)
    }
}
// let mapDispatch = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAction(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAction(userId))
//         },
//         setUser: (user) => {
//             dispatch(userAction(user))
//         },
//         setPage: (page) => {
//             dispatch(pageAction(page))
//         },
//         totalUserCount: (totalUserCount) => {
//             dispatch(totalUserCountAction(totalUserCount))
//         },
//         isFetching: (fetching)=>{
//             dispatch(fetchingAction(fetching))
//         }
//     }
// }
let UserContainer = connect(mapState, {
    follow: followAction,
    unfollow: unfollowAction,
    setPage: pageAction,
    inProgress: progressAction,
    getUsersThunk,
    unfollowThunk,
    followThunk
})(UsersAPI);
export default UserContainer;