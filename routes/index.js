const routes = require('express').Router();
const { Product } = require('../models')
const { User } = require('../models')

routes.get('/', (req,res)=> {
    res.send('masuk')
})

routes.get('/admin/tickets', (req,res) => {
    Product.findAll()
           .then((data) => {
            res.render('index', {path: './tickets/user-regis.ejs', products:data})
           })
           .catch((err) => {
            res.send(err)
           })
    
})

routes.get('/admin/tickets/add', (req,res) => {
    res.render('index', {path: './tickets/add'})
})

routes.get('/user/registration', (req, res) => { 
    res.render("user/indexUser", {path: './user-regis.ejs', title: "User Registration"})
})

routes.post('/user/registration', (req, res) => { 
    User.create({ 
        username: req.body.username,
        password: req.body.password,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = routes