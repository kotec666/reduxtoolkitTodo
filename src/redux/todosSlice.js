import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: 'idle'
    },
    reducers: {
        todosLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        todosReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.todos = action.payload
            }
        },
        addTodo(state, action) {
                state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos =  state.todos.filter(todo => todo.id !== action.payload.id)
        },

        doneTodo(state, action) {
            const todo = state.todos.find((el) => el.id === action.payload.id)
            todo.isDone = !todo.isDone
        },
    }
})

export default todosSlice.reducer
export const {addTodo, removeTodo, doneTodo, todosLoading, todosReceived} = todosSlice.actions

export const fetchTodos = () => async (dispatch) => {
    dispatch(todosLoading())
    const response = await axios.get(`${process.env.REACT_APP_API}/todos`)
    dispatch(todosReceived(response.data))
}

export const fetchAddTodo = (obj) => async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/todos`, obj)
    dispatch(addTodo(response.data))
}

export const fetchRemoveTodo = (id) => async (dispatch) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/todos/${id}`)
    dispatch(removeTodo(response.data))
}

export const fetchDoneTodo = ({id, isDone}) => async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_API}/todos/${id}`, {isDone})
    dispatch(doneTodo(response.data))
}