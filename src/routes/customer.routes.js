const express = require('express')
const customerRoutes = express.Router()
const Customer = require('../customer')
const httpStatus = require('http-status')
const {v4} = require('uuid')
//criar uma rota com o endereço "/"

const customers = []
customerRoutes.get("/customers", (req, res) => {
    return res.json(customers)
})

customerRoutes.post('/customers', (req, res) => {
    const { name, cpf, birthday } = req.body

    const id = v4()
    // const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    customers.push(customer)
    res.status(httpStatus.CREATED).json(customer)

})

customerRoutes.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    const customerFound = customers.find(client => client.id == id)   
    if(!customerFound){
        res.status(httpStatus.NOT_FOUND).json({
            "message": "Customer not found  "
        })
    }
    res.status(httpStatus.OK).json(customerFound)  
})

customerRoutes.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const { name, cpf, birthday} = req.body
    const customerId = customers.find(client => client.id == id)
    if(!customerId){
        res.status(httpStatus.NOT_FOUND).json({
            message: "Customer not found"
        })
    }
    customerId.name = name;
    customerId.cpf = cpf;
    customerId.birthday = birthday;

  
    res.json(customerId)
})

customerRoutes.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const userId = customers.findIndex(customer => customer.id == id)   
    customers.splice(userId, 1)
    res.json({message: "Successfully deleted user"})  
})


module.exports = customerRoutes