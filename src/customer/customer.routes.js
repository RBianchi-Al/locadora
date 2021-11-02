const express = require('express')
const controller = require('./customers-constrollers')
const customerRoutes = express.Router()

customerRoutes.get("/customers", controller.findAll)

customerRoutes.post('/customers', controller.create)

customerRoutes.get('/customer/:id', controller.findById)

customerRoutes.put('/customer/:id', controller.updated)

customerRoutes.delete('/customers/:id', controller.destroy)


module.exports = customerRoutes