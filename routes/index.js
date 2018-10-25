const routes = require('express').Router();
const { Product } = require('../models')

routes.get('/', (req,res)=> {
    res.send('masuk')
})

routes.get('/admin/tickets', (req,res) => {
    Product.findAll()
           .then((data) => {
            res.render('index', {path: './tickets/index', products:data})
           })
           .catch((err) => {
            res.send(err)
           })
    
})

routes.get('/admin/tickets/add', (req,res) => {
    res.render('index', {path: './tickets/add'})
})
module.exports = routes