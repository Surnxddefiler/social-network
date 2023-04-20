import React from 'react';
import style from './users.module.css'
import { NavLink } from "react-router-dom";
import axios from "axios";
import { userApi } from '../../API/api';
import Paginator from '../../assets/preloader/paginator';
let Users = (props) => {
    //console.log(props.totalUsers)
    return (
        <section className={style.users}>
            <div className={style.page}>
                {Paginator(props.totalUsers, props.pageSize, props.pageChange, props.current, style)}
            </div>
            <div className={style.title}>Users</div>
            {props.userData.map(el => {
                return <div className={style.user}>
                    <div className={style.img}>
                        <NavLink to={'/profile/' + el.id}>
                            <img src={el.photos.small != null ? el.photos.small : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s"}></img>
                        </NavLink>
                        {el.followed
                            ? <button disabled={props.progress.some(id=>id=== el.id)} onClick={() => {props.unfollowThunk(el.id)}} 
                                className={style.button}>unfollow</button>
                            : <button disabled={props.progress.some(id=>id=== el.id)} onClick={() => {props.followThunk(el.id)}} 
                            className={style.button}>follow</button>}
                    </div>
                    <div className={style.info}>
                        <div className={style.name}>{el.name}</div>
                        <div className={style.status}>{el.status}</div>
                        <div className={style.city}></div>
                    </div>
                </div>

            })}
            <div className={style.button}>Show mpre</div>
        </section>
    )
}
export default Users