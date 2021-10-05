const express = require('express')
const routes = express.Router()
const Customer = require('./customer')
//criar uma rota com o endereço "/"
const customers = []
routes.get("/customers", (req, res) => {
    return res.json(customers)
})
routes.get('/customers', (req, res) => {
    ///req requisicao
    ///res resposta
    res.status(200).json({
        message: "Hello world"
    })
})

routes.post('/customers', (req, res) => {
    const { name, cpf, birthday } = req.body
    const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    customers.push(customer)
    res.json(customer)

})

module.exports = routes