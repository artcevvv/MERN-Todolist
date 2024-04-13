import express, { Express } from 'express'
import cors from 'cors'
import todoRoutes from './routes' 
import mongoose from 'mongoose'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)
app.use(express.json());

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@main.hdhmdcy.mongodb.net/?retryWrites=true&w=majority&appName=main`
// const options = {newUrlParser: true, useUnifiedTopology: true};

mongoose
    .connect(uri)
    .then(()=>
        app.listen(PORT, () => 
            console.log(`Server is running on http://localhost:${PORT}`)
        )
    )
    .catch(err => {
        throw err
    }) 

