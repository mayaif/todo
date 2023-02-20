import {useState, useEffect} from "react"
import './App.css';

const App = () => {

  //When the app first loads, initialize the todos state 
  //with the todos saved in localStorage
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []);
  const [todo, setTodo] = useState("");

  const [editTodo, setEditTodo] = useState(null)
  const [editText, setEditText] = useState("")

  //save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  function handleSubmit(e){
    e.preventDefault()
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(), 
      isCompleted: false
    }

    if(newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo))
      setTodo("")
    } else {
      alert("Enter Valid Task")
      setTodo("")
    }
  }

  function deleteToDo(id) {
    let deletedTaskArr = [...todos].filter(task => task.id !== id)
    setTodos(deletedTaskArr)
  }

  function toggleChecked(id) {
    let checkedTodos = [...todos].map(todo => {
      if(todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(checkedTodos)
  }

  function submitEdit(id) {
    const updatedTodosArr = [...todos].map(todo => {
      if(todo.id === id){
        todo.text = editText
      }
      return todo
    })
    setTodos(updatedTodosArr)
    setEditTodo(null)
  }

  
  return(
    <div className ="todo-container">
      <h1>Task<span className="second-title">Master</span></h1>
      <form onSubmit={handleSubmit}>
        <input className="add-task"
          type ="text" 
          placeholder="add new task ..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type ="submit" className="add-button">Add</button>
      </form>
      {todos.map(todo => 
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input className="checkbox"
            type="checkbox" 
            id="isCompleted" 
            checked={todo.isCompleted} 
            onChange={() => toggleChecked(todo.id)} />
           
            {todo.id === editTodo ? (
              <input type="text" onChange={(e) => setEditText(e.target.value)} />) : ( <div>{todo.text}</div>)
            }
          </div>
          <div className="todo-actions">
            {todo.id === editTodo ? (
              <button className="submit-edits"
                onClick={() => submitEdit(todo.id)}>Save Edits</button>
            ) : (<i className="ri-edit-2-line" onClick={() => setEditTodo(todo.id)}></i>)
            }
            <i className="ri-delete-bin-line" onClick={() => deleteToDo(todo.id)}></i>
            
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
