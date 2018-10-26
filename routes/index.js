const routes = require('express').Router();
const { Product } = require('../models');
const { Admin } = require('../models')
const { User } = require('../models')
const { Transaction } = require('../models')
const bcrypt = require("bcryptjs");
const isLogin = require('../middlewares/isLogin')
const sequelize = Admin.sequelize;

routes.get('/', (req,res)=> {
    res.send('masuk')
})

routes.get('/logout', (req,res)=> {
    req.session.destroy();
    res.redirect('/tickets')
})
//CRUD PRODUCTS BY ADMIN
routes.get('/tes', (req,res)=>{
    sequelize.query('SELECT * FROM admins', { model: Admin }).then(products => {
        // Each record will now be a instance of Project
        res.send(products)
      })
})
routes.get('/admin/login', (req,res) => {
    res.render('index', {path: './partials/loginForm', title: "Admin Login"})
})

routes.post('/admin/login', (req,res) => {
    Admin.findAll({ where: {username: req.body.username}})
    .then(data => {
        if(bcrypt.compareSync(req.body.password, data[0].password)){
            req.session.admin = {
                name: req.body.username,
                id : data[0].id
            }
            res.redirect('/admin/tickets')
        }else{
            res.send("gagal")
        }
    })
    .catch(err => {
        throw err
    })
})

routes.get('/admin/registration', (req, res) => { 
    res.render('index', {path: './partials/regis.ejs', title: "Admin Registration"})
})

routes.post('/admin/registration', (req, res) => { 
    Admin.create({ 
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

routes.get('/admin/tickets',isLogin, (req,res) => {
    Product.findAll()
           .then((data) => {
            res.render('index', {path: './tickets/index', products:data, title:'Tickets List'})
           })
           .catch((err) => {
            res.send(err)
           })
    
})

routes.get('/admin/tickets/add', isLogin, (req,res) => {
    res.render('index', {path: './tickets/add', title:'Add Ticket'})
})

routes.post('/admin/tickets/add', isLogin,(req,res) => {
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

routes.get('/admin/tickets/update/:productId', isLogin, (req,res)=>{
    Product.findById(req.params.productId)
           .then((data) => {
            res.render('index', {path: './tickets/update', title:'Update Tickets', ticket:data})
           })
           .catch((err)=> {
            res.send(err)
           })
})

routes.post('/admin/tickets/update/:productId', isLogin, (req,res)=>{
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

routes.get('/admin/tickets/delete/:productId', isLogin,(req,res)=>{
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
routes.get('/admin/transactions',(req,res) => {
    Transaction.findAll({
        include : Product
    })
           .then((data) => {
            res.send(data)
            //res.render('index', {path: './transactions/index', transactions:data, title:'Transaction List'})
           })
           .catch((err) => {
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
            req.session.user = {
                username: req.body.username,
                userId : data[0].id
            }
            res.redirect('/tickets')
        }else{
            res.send("gagal")
        }
    })
    .catch(err => {
        throw err
    })
})

//USER SHOW TICKETS
routes.get('/tickets', (req, res) => {
    Product.findAll()
           .then((data) => {
            res.render("user/indexUser", {path: '../tickets/indexUser',products:data, title: "Tickets List"})
           })
           .catch((err) => {
            res.send(err)
           })
})

routes.get('/specialDeals', (req,res)=>{
    Product.findLowPrice()
           .then((data) => {
               console.log('sini')
               res.render('user/indexUser', {path: '../tickets/specialDeal', products:data, title:"GET SPECIAL DEALS"})
           })
           .catch((err)=>{
               console.log('err');
               
               res.send(err)
           })
})
//USER BUY TICKETS
routes.get('/tickets/buy/:id',isLogin, (req, res) => {
    Product.findById(req.params.id)
           .then((data) => {
            const price = data.setPrice();
            res.render("user/indexUser", {path: '../tickets/showTicket',product:data, title: "Buy Tickets Detail", newPrice:price})
           })
           .catch((err) => {
            res.send(err)
           })
})

routes.post('/tickets/buy/:id',isLogin, (req,res) => {
    Transaction.create({
        UserId : req.session.user.userId,
        ProductId : req.params.id,
        TotalPrice:  req.body.productPrice * req.body.quantity 
    })
    .then(()=>{
        res.send('Purchase Success')
    })
    .catch((err)=>{
        res.send(err)
    })
})

routes.get('/mypurchase', isLogin, (req,res)=>{
    Transaction.findAll({
        where: {
            UserId: req.session.user.userId
        },
        include : Product
    }).then(data => {
        res.render("user/indexUser", {path: '../transactions/userPurchase', data:data, title: "Your Purchase List"})
    })
    .catch((err) => {
        res.send(err)
    })
})
module.exports = routes