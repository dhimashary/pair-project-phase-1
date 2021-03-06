const express = require('express');
const session = require('express-session')
const routes = require('./routes');
const port = process.env.PORT || 3000;

let app = express();

app.set('view engine','ejs');
app.use(session({
    secret: 'rahasia',
    resave: false
}))
app.use(express.urlencoded({extended:false}));
app.use('/', routes);

app.listen(port, ()=>{
    console.log('server is running');
    
})