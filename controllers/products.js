import product from "../models/product.js"

const getallProductsStatic = async (req,res)=>{
    try {
        const products = await product.find({price:{$gt:30}})
        .sort('price')
        .select('name price')
        .skip(0)
        .limit(0)
        res.status(200).json({products,nbhits:products.length})
    } catch (error) {
        console.error(error)
    }
}

const getallProducts = async (req,res)=>{
    try {
        const {featured,company,name,sort,fields,numFilters} = req.query
        const queryObject = {}
        if(featured){
            queryObject.featured = featured
        }
        if(company){
            queryObject.company = company
        } 
        if(name){
            queryObject.name= {$regex:name,$options:'i'}
        }  
        if(numFilters){
            const operatorMap = {
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<':'$lt',
                '<=':'$lte',
            }
            const regex = /\b(>|<|>=|<=|=)\b/g
            let allFilters = numFilters.replaceAll(
                regex,
                (match)=> `-${operatorMap[match]}-`)    
            const options = ['price','rating']
            allFilters = allFilters.split(',').forEach((element) => {
                const [fields,operator,value] = element.split('-')
                if(options.includes(fields)){
                   queryObject[fields] = {[operator]:Number(value)}  
                }
            });            

        }  
           
        let result =  product.find(queryObject)
        
        if(sort){
          const sortList = sort.replaceAll(","," "); 
          result = result.sort(sortList)
        }
        else{
            result = result.sort("createdAt")
        }
        if(fields){
            const fieldList = fields.replaceAll(","," ")
            result = result.select(fieldList)
        }
        const limit = Number(req.query.limit) || 100
        const page = Number(req.query.page) || 1
        const skip = (page-1)*limit
        result = result.limit(limit).skip(skip)
      
        const products = await result
        res.status(200).json({products,nbhits:products.length})
    } catch (error) {
        console.error(error)
    }
}

export {getallProducts,getallProductsStatic}