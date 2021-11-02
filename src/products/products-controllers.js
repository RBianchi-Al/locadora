const Products = require('./index')
const httpStatus = require('http-status')
const {v4} = require('uuid')
const DAO = require('../base/dao')

const products  = []
const daoProduct = new DAO(products)

const RESPONSE_NOT_FOUND = {
    "message": "Customer not found"
}
class ProductsController {
    create(req, res){
        const { description, quantityStock, quantityAvailable, value } = req.body
        const id = v4()
        const product = new Products(id, description, quantityStock, quantityAvailable, value)
        res.status(httpStatus.CREATED).json(daoProduct.create(product))    
    }
    findAll(req, res) {
        return res.status(httpStatus.OK).json(daoProduct.findAll())
    }
    findById(req, res){
        const { id } = req.params;
        const productId = daoProduct.findById(id)   
        if(!productId){
            res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
        }
        res.status(httpStatus.OK).json(productId) 
    }
    updated(req, res){
        const { id } = req.params;
        const {description, quantityStock, quantityAvailable, value} = req.body
      
        const productId = daoProduct.findById(id)
        if(!productId){
            res.status(httpStatus.NOT_FOUND).json({
                message: "Product not found"
            })
        }
      
        if(description){
            productId.description = description;
        }
        if(quantityStock){
            productId.quantityStock = quantityStock;
        }
        if(quantityAvailable){
            
            productId.quantityAvailable = quantityAvailable;
        }
        if(value){          
            productId.value = value;
        }
         productId.updated_at = new Date()
        return res.status(httpStatus.OK).json(daoProduct.updated(productId, id))
    }
    destroy(req, res) {
        const { id } = req.params;
        const productId = daoProduct.findById(id)   
        daoProduct.destroy(id)
        res.json({message: "Successfully deleted product"})  
    
    }
}
module.exports = new ProductsController;