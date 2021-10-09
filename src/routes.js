const express = require('express')
const routes = express.Router()
const Customer = require('./customer')
//criar uma rota com o endereço "/"
const customers = []
routes.get("/customers", (req, res) => {
    return res.json(customers)
})

routes.post('/customers', (req, res) => {
    const { name, cpf, birthday } = req.body
    const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    customers.push(customer)
    res.json(customer)

})

routes.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const userId = customers.find(customer => customer.id == id)   
    res.json(userId)  
})

routes.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const { name, cpf, birthday} = req.body
    const userId = customers.find(customer => customer.id == id)
    if(!userId){
        res.status(400).json({
            message: "User Already Exists"
        })
    }
    userId.name = name;
    userId.cpf = cpf;
    userId.birthday = birthday;

  
    res.json(userId)
})

routes.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const userId = customers.findIndex(customer => customer.id == id)   
    customers.splice(userId, 1)
    res.json({message: "User exclude with sucess"})  
})


module.exports = routes