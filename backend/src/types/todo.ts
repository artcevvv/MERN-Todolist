import { Document } from "mongodb"

export interface ITodo extends Document {
    name: string
    description: string
    status: boolean
}