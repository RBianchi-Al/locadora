const express = require('express')
const productsRoutes = express.Router()
const controller = require('./products-controllers')

productsRoutes.get("/product", controller.findAll)

productsRoutes.post('/product', controller.create)

productsRoutes.get('/product/:id', controller.findById)

productsRoutes.put('/product/:id', controller.updated)

productsRoutes.delete('/product/:id', controller.destroy)


module.exports = productsRoutes