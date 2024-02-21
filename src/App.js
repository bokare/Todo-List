import "./App.css";
import { useState,useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Context/TodoContex";

function App() {
  const [todos, settodos] = useState([]);
  const addTodo = (todoItem) => {
    settodos((prev) => [{id:Date.now(),...todoItem}, ...prev]);   /////////////////
  };

  const updateTodo = (id,todoItem)=>{
    settodos((prev)=> (
      prev.map((item)=>(
        item.id===id? todoItem :item
      ))
    ))
  }

  const deleteTodo =(id)=>{
    settodos((prev)=> prev.filter((item)=> item.id!==id)
    )
  }

  const toggleComplete = (id)=>{
    settodos((prev)=> prev.map((item)=> 
    item.id===id? {...item,complete:!item.complete}:item))        /////////////
  }

  useEffect(() => {
    const todos  = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length >0){
      settodos(todos)
    }
  }, [])
  
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  return (
    <>
      <TodoProvider value={{todos,addTodo,updateTodo,toggleComplete,deleteTodo}}>
        <div className="bg-[#172842] min-h-screen py-8">     {/* hash color */}  
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">{<TodoForm />}</div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((item)=>(
                <div key={item.id} className="w-full">
                  <TodoItem key={item.id} TodoItem={item}/>

                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
