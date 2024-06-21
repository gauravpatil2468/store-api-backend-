import express from 'express'
import { getallProductsStatic,getallProducts } from '../controllers/products.js'
const router = express.Router()

router.route('/').get(getallProducts)
router.route('/static').get(getallProductsStatic)

export default router