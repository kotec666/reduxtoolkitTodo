import React from 'react'
import s from "../../App.module.css"
import gal from "../../icons/gal.svg"
import trash from "../../icons/trash.png"

const Todoitem = ({text, isDone, onRemoveTodo, onChangeDoneTodo, id}) => {

       const onClickRemove = (id) => {
           onRemoveTodo(id)
       }

       const onClickDone = (id, text, isDone) => {
           onChangeDoneTodo(id, isDone)
       }

    return (
        <div className={s.card_body_item}>
            {isDone ? <span></span> : null}
            <div className={s.card_body_item_text}>
                {text}
            </div>
            <div className={s.card_body_item_done} onClick={() => onClickDone(id, isDone)}>
                <img src={gal} alt="gal"/>
            </div>
            <div className={s.card_body_item_delete} onClick={() => onClickRemove(id)}>
                <img src={trash} alt="trash"/>
            </div>
        </div>
    )
}

export default Todoitem