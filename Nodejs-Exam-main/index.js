const express = require('express');
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({resave: false, saveUninitialized: false, secret: 'key'}));

app.engine('hbs', engine({defaultLayout: 'main' , extname: 'hbs'}))
app.set('view engine','hbs');
app.set('views', './views');

app.get('/', (req,res) => {
    res.render("home", { session: req.session.username ?? '' });
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post("/register", (req,res) => {
    console.log('Name: ' + req.body.name);
    console.log('BirthDate: ' + req.body.date);
    console.log('Gender: ' + req.body.gender);
    console.log('Class: ' + req.body.class);
    console.log('Code:' + req.body.code);
    req.session.username = req.body.name;
    res.redirect(303,'/');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
})