import React, { useEffect, useState } from "react";
const StatusHooks= (props)=>{
    let [editMode, setEditMode]= useState(false) //в эдит мод идёт тру а в сет идёт функция
    let [status, setStatus]= useState(props.status)
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])
    const activate=()=>{
        setEditMode(true)
    }
    const deactivate=()=>{
        setEditMode(false)
        props.updateStatusThunk(status)
    }
    const statusChange=(e)=>{ // изменение статуса
        setStatus(e.currentTarget.value)
    }
        return(
            <span>
                {!editMode &&
                  <span onDoubleClick={activate} >{props.status || "---"}</span>}
                {editMode &&
                <input onChange={statusChange} onBlur={deactivate} value={status}/>}
            </span>
        )
        }
export default StatusHooks
