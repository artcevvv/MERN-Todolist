import React from "react";

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void;
    deleteTodo: (_id: string) => void;
  };

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const saveTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={saveTodo}>{todo.name}</h1>
        <span className={saveTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
