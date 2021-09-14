import React, {useEffect, useState} from 'react'
import s from './App.module.css'

import Todoitem from "./components/Todoitem/Todoitem"
import {useDispatch, useSelector} from "react-redux"
import {fetchTodos, fetchAddTodo, fetchRemoveTodo, fetchDoneTodo} from "./redux/todosSlice"
import Loader from "./components/Loader/Loader";

function App() {

    const [todoValue, setTodoValue] = useState('')
    const [error, setError] = useState('')

    const todos = useSelector(state => state.todos.todos)
    const {loading} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const addTodoItem = () => {
        if (todoValue) {
            const id = todos.length + 1
            dispatch(fetchAddTodo({id: id, text: todoValue, isDone: false}))
            setError('')
        } else {
            setError('Поле не может быть пустым')
        }
    }

    const onRemoveTodo = (id) => {
        dispatch(fetchRemoveTodo(id))
    }

    const onChangeDoneTodo = (id, isDone) => {
        const newIsDone = !isDone
        dispatch(fetchDoneTodo({id, isDone: newIsDone}))
    }

    useEffect(() => {
        dispatch(fetchTodos())
        // eslint-disable-next-line
    }, [])



  return (
    <div className="App">
      <div className={s.wrapper}>
        <div className={s.card}>
          <div className={s.card_header}>
              <div className={s.card_header_items}>
                  <input type="text" placeholder="Выполнить дело..." value={todoValue} onChange={(e) => {setTodoValue(e.target.value)}}/>
                  <button onClick={addTodoItem}>Добавить</button>
                  <div className={s.error}>{error && error}</div>
              </div>
          </div>
          <div className={s.card_body}>
                <div className={s.card_body_items}>
                        {
                            loading === 'idle'
                          ? todos && todos.map((todo, index) => {
                            return <Todoitem key={`${index} ${todo.text}`} onRemoveTodo={onRemoveTodo} onChangeDoneTodo={onChangeDoneTodo} id={todo.id} text={todo.text} isDone={todo.isDone} />
                                })
                          : <Loader />
                        }
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
