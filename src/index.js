const express = require('express');
const path = require('path');
const port = process.env.port || 8000;
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname,'../templates/partials'));

const app = express();

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'../templates/views'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.get('/project',(req,res)=>{
    res.render('project');
})
app.get('/project/weather',(req,res)=>{
    res.render('weather');
})
app.get('/404error',(req,res)=>{
    res.render('404');
})
app.get('*',(req,res)=>{
    res.render('404');
})


app.listen(port, ()=>{
    console.log("Server Started...")
})