const routes = require('express').Router();
const { Product } = require('../models')
const { User } = require('../models')
const { Transaction } = require('../models')

routes.get('/', (req,res)=> {
    res.send('masuk')
})

//CRUD PRODUCTS BY ADMIN
routes.get('/admin/tickets', (req,res) => {
    Product.findAll()
           .then((data) => {
            res.render('index', {path: './tickets/index', products:data, title:'Tickets List'})
           })
           .catch((err) => {
            res.send(err)
           })
    
})

routes.get('/admin/tickets/add', (req,res) => {
    res.render('index', {path: './tickets/add', title:'Add Ticket'})
})

routes.post('/admin/tickets/add', (req,res) => {
    Product.create({
        name : req.body.name,
        price: Number(req.body.price),
        date: req.body.date,
        createdAt: new Date(),
        updatedAt : new Date()
    })
    .then (()=>{
        res.redirect('/admin/tickets')
    })
    .catch((err)=>{
        res.send(err)
    })
})

routes.get('/admin/tickets/update/:productId', (req,res)=>{
    Product.findById(req.params.productId)
           .then((data) => {
            res.render('index', {path: './tickets/update', title:'Update Tickets', ticket:data})
           })
           .catch((err)=> {
            res.send(err)
           })
})

routes.post('/admin/tickets/update/:productId', (req,res)=>{
    Product.findById(req.params.productId)
           .then((data) => {
            data.name = req.body.name;
            data.price = req.body.price;
            data.date = req.body.date;
            return data.save();
           })
           .then(()=>{
            res.redirect('/admin/tickets')
           })
           .catch((err)=> {
            res.send(err)
           })
})

routes.get('/admin/tickets/delete/:productId', (req,res)=>{
    Product.destroy({
        where : {
            id : req.params.productId
        }
    })
    .then(()=>{
        res.redirect('/admin/tickets')
    })
    .catch((err)=>{
        res.send(err)
    })
})

//Read and Delete transactions by admin
routes.get('/admin/transaction', (req,res) => {
    Transaction.findAll()
           .then((data) => {
            res.render('index', {path: './transactions/index', transactions:data, title:'Transaction List'})
           })
           .catch((err) => {
            res.send(err)
           })
    
})

//USER REGISTER
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

//USER BUY TICKETS
routes.get('/tickets', (req, res) => {
    Product.findAll()
           .then((data) => {
            res.render("user/indexUser", {path: '../tickets/indexUser',products:data, title: "Tickets List"})
           })
           .catch((err) => {
            res.send(err)
           })
})

module.exports = routes