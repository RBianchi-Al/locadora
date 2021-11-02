class DAO {
    constructor(model) {
        this.model = model
    }
    create(obj){
        this.model.push(obj)
        return obj
    }
    findAll(id){
      return this.model 
    }
    findById(){
        return this.model.find(client => client.id == id)
    }
    updated(updatedObject, id){
        const idx = this.model.findIndex(prod => prod.id == id)
        this.model[idx] = updatedObject
        return this.model.find(index => index.id == id)
    }
    destroy(id){
       this.model.findIndex(customer => customer.id == id)
       this.model.splice(userId, 1)
    }
}
module.exports = DAO;