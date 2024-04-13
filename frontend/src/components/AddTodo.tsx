import React, { useState } from "react";

type Props =  {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  // const saveTodo: string = todo.status ? `line-through` : "";
  return (
    <form onSubmit={(e) => saveTodo(e, formData)} className="Form">
      <div>
        <div>
          <label htmlFor="name">
            <input onChange={handleForm} type="text" id="name" />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            <input onChange={handleForm} type="text" id="description" />
          </label>
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
