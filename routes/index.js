const routes = require('express').Router();
const { Product } = require('../models')
const { User } = require('../models')
const bcrypt = require("bcryptjs");

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

//USER REGISTER
routes.get('/user/registration', (req, res) => { 
    res.render('user/indexUser', {path: './user-regis.ejs', title: "User Registration"})
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

routes.get('/login', (req,res) => {
    res.render('user/indexUser', {path: './user-login.ejs', title: "User Registration"})
})

routes.post('/login', (req,res) => {
    User.findAll({ where: {username: req.body.username}})
    .then(data => {
        if(bcrypt.compareSync(req.body.password, data[0].password)){
            res.send("success")
        }else{
            res.send("gagal")
        }
    })
    .catch(err => {
        throw err
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

routes.get('/testing', (req,res)=> {
    let income = [1, 2, 3] // quantity of products. ini ceritanya ada 3 product
    let event = ["Event Marathon", "Sing event", "Coldplay concert"]
    let data = {
        labels: event,
        datasets: [{
            label: '# of Votes',
            data: income,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
    res.render('transactions/incomeReport', {title: "testing", data: data})
})
module.exports = routes