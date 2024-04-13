import React, { useEffect, useState } from 'react'
import { addTodo, deleteTodo, getTodos, updateTodo } from './API'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'

const App: React.FC = () => {
  const [todos, addTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: {todos} }: ITodo[] | any) => addTodos(todos))
      .catch((err: Error) => console.log(err))
    }
  
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo) : void => { 
    e.preventDefault()
    addTodo(formData) 
      .then(({ status, data }) => {
        if(status !== 201){
          throw new Error('Error! Todo not saved')
        }
        addTodos(data.todos)
      })
      .catch(err=> console.log(err))
  }
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({status, data}) => {
        if(status !== 200) {
          throw new Error('Not updated')
        }
        addTodos(data.todos)
      })
      .catch((err:any) => console.log(err))
  }
  const handleDeleteTodo = (_id: string): void => { 
    deleteTodo(_id)
      .then(({status, data}) => {
        if(status !== 200) {
          throw new Error("Not deleted")
        }
        addTodos(data.todos)
      })
      .catch((err:any) => console.log(err)) 
  }
  return (  
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo}/>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo._id}
          updateTodo= {handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
          />
      ))}
    </main>
  )
}

export default App