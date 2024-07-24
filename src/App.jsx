import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {
const [todo, setTodo] = useState("")         //Input Text
const [todos, setTodos] = useState([])        //Hold Every todos
const [finished , setFinished] = useState(true)
const saveTols = ()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
}

const toggleFinished = ()=>{
  setFinished(!finished)
}

useEffect(()=>{
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])

 const handleAdd = ()=>{
  setTodos([...todos, {id: uuidv4(),todo , isCompleted: false}])
  setTodo("")
  saveTols()
 }

 const handleChange = (e)=>{
  setTodo(e.target.value)
  
 }

 const handleEdit = (e,id)=>{
  let t = todos.filter(i=> i.id==id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  saveTols()
 }

 const handleDelete = (e,id)=>{
  let newTodos = todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  saveTols()
 }

 const handleCheckBox = (e)=>{
 let id = e.target.name;
 let index = todos.findIndex(item=>{
  return item.id == id;
 })

 let newTodos = [...todos];                 //same name but new array and referance is same
 newTodos[index].isCompleted = !newTodos[index].isCompleted;
 setTodos(newTodos)
 saveTols()
 }

  return (
    <>
     <Navbar />
     <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
     <h1 className='font-bold text-center text-3xl'>Manage your todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full p-1' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-green-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md  mx-2 disabled:bg-red-100'>Save</button>
        </div>
      </div>
      <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={finished} /><label className='mx-2' htmlFor="show"></label> Show Finished
      <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
      <h2 className='text-2xl font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length === 0  && <div className='m-5'>No Todos to display</div> }
        {todos.map(item=>{
        
       // eslint-disable-next-line react/jsx-key
       return (finished || !item.isCompleted) &&  <div key={item.id} className="todo flex  my-3 justify-between">
        <div className='flex gap-5'>
        <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
        <div className={item.isCompleted? "line-through" :""}>{item.todo}</div>
        </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
            <button onClick={(e)=> {handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
          </div>
        </div>
    })}
      </div>
      </div>
     
    </>
  )
}

export default App
