
const express = require('express')  ///importar libs ou arquivos objetos com require

const customerRoutes = require('./customer/customer.routes')
const productsRoutes = require('./products/products.routes')
const app = express()  ///colocar () starta o objeto, atribuir ao app o express startado. 

app.use(express.json())

app.use('/', customerRoutes)
app.use('/', productsRoutes)

const port = 3000  ///direcionar a requisicao para uma porta. 


///ouvir ou escutar na porta 3000, é um callback uma instrução sem parâmetro
app.listen(port, () => {
    
    console.log(`Example app listening at http://localhost:${port}`)
})