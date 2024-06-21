import dotenv from 'dotenv'
import product from './models/product.js' 
import connectDB from './db/connect.js'
import jsonProducts from './products.json' assert {type:'json'}
dotenv.config()

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        await product.deleteMany()
        await product.create(jsonProducts)
        console.log('success!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()