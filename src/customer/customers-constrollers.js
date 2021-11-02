const Customer = require('./index')
const httpStatus = require('http-status')
const {v4} = require('uuid')
const DAO = require('../base/dao')
//criar uma rota com o endereço "/"

const customers = []
const daoCustomer = new DAO(customers)

const RESPONSE_NOT_FOUND = {
    "message": "Customer not found"
}
function create (req, res) {
    const { name, cpf, birthday } = req.body
    const id = v4()
    // const id = customers.length + 1
    const customer = new Customer(id, name, cpf, birthday)
    res.status(httpStatus.CREATED).json(daoCustomer.create(customer))
}

function findAll(req, res) {
    return res.status(httpStatus.OK).json(daoCustomer.findAll())
}
function findById(req, res) {
    const { id } = req.params;
    const customerFound = daoCustomer.findById(id)  
    if(!customerFound){
        res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    res.status(httpStatus.OK).json(customerFound)  
}
function updated(req, res) {
    const { id } = req.params;
    const { name, cpf, birthday} = req.body
    const customerId = daoCustomer.findById(id)
    
    if(!customerId){
        res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    }
    if(name){
        customerId.name = name
    }
    
    if(cpf){
        customerId.cpf = cpf
    }
    if(birthday){
        customerId.birthday = birthday  
    }
    productId.updated_at = new Date()
    
  
    return res.status(httpStatus.OK).json(daoCustomer.updated(customerId, id))

}
function destroy(req, res){
    const { id } = req.params;
    const userId = daoCustomer.findById(id)
    if(userId < 0){
        return res.status(httpStatus.NOT_FOUND).json(RESPONSE_NOT_FOUND)
    } 
    daoCustomer.destroy(id)
    res.json({message: "Successfully deleted user"}) 
}

module.exports = {
    create,
    findAll,
    findById,
    updated,
    destroy
}