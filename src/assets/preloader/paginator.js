import { useState } from "react"

const Paginator = (totalUsers, pageSize, pageChange, current, style, portionSize=10) => {
    let pageCount = Math.ceil(totalUsers / pageSize)
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    let portionCount=Math.ceil(pageCount/portionSize)
    let [portionNumber, setPortion]= useState(1);
    let leftPortion=(portionNumber-1) * portionSize +1;
    let rightPortion= portionNumber * portionSize
    return <div>
        {portionNumber>1&&
        <button onClick={()=>{setPortion(portionNumber-1)}}>BOB</button>}
        {pages
        .filter(p=>p>=leftPortion && p <=rightPortion)
        .map(p => {
        return (
            <span onClick={() => {pageChange(p)}} className={current === p && style.active}>{p}</span>
        )
    })}
    {portionCount > portionNumber &&
    <button onClick={()=>{setPortion(portionNumber+1)}}>Next</button>}
    </div>
}
export default Paginator