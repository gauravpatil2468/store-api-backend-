import express,{json} from 'express';
const app = express();
import expressAsyncErrors from 'express-async-errors'
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';


import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT 
app.use(json())

expressAsyncErrors


app.use('/api/v1/products',productsRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,(req,res)=>{
            console.log(`listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()