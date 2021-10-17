const express = require('express')
const productsRoutes = express.Router()

const Products = require('../products')

const httpStatus = require('http-status')
const {v4} = require('uuid')
const products  = []

productsRoutes.get("/product", (req, res) => {
    return res.json(products)
})

productsRoutes.post('/product', (req, res) => {
    const { description, quantityStock, quantityAvailable, value } = req.body
    const id = v4()
    const product = new Products(id, description, quantityStock, quantityAvailable, value)
    products.push(product)
    res.status(httpStatus.CREATED).json(product)

})

productsRoutes.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const productId = products.find(prod => prod.id == id)   
    if(!productId){
        res.status(httpStatus.NOT_FOUND).json({
            "message": "Product not found"
        })
    }
    res.status(httpStatus.OK).json(productId)  
})

productsRoutes.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const {description, quantityStock, quantityAvailable, value} = req.body
    const productId = products.find(prod => prod.id == id)
    if(!productId){
        res.status(httpStatus.NOT_FOUND).json({
            message: "Product not found"
        })
    }
  
    productId.description = description;
    productId.quantityStock = quantityStock;
    productId.quantityAvailable = quantityAvailable;
    productId.value = value;
 
    res.json(productId)
})

productsRoutes.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    const productId = products.findIndex(prod => prod.id == id)   
    products.splice(productId, 1)
    res.json({message: "Successfully deleted product"})  
})


module.exports = productsRoutes