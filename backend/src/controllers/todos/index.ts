import { Request, Response } from "express";
import Todo from "../../models/Todo";
import { ITodo } from "../../types/todo";



const getTodos = async (req: Request, res: Response): Promise<void> => {
    try{
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({todos})
    } catch(err) {
        throw err
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
        
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res
            .status(201)
            .json({message: "Todo Added",
                todo: newTodo,
                todos: allTodos,
            })
    } catch(err){
        throw err
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req
        
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            {_id: id},
            body
        )
        
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo Updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (err) {
        throw err
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => { 
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
            req.params.id
        )
        
        const allTodos: ITodo[] = await Todo.find()

        res.status(200).json({
            message: "Todo Removed",
            todo: deletedTodo,
            todos: allTodos
        })
    } catch (err) {
        throw err
    }
}


export {getTodos, updateTodo, addTodo, deleteTodo}