import {useContext,createContext} from 'react'

const Context = createContext({
    todos:[
        {
            id:1,
            msg:"to do",
            complete:false
        }
    ],
    addTodo:(todoItem)=> {},
    updateTodo:(id,todoItem)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
});

export const TodoProvider = Context.Provider

export const useTodo = ()=>{
    return useContext(Context)
}