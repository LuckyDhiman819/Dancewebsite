const express = require("express");
const path = require("path");
const fs = require("fs");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// const hostname = "127.0.0.2";
const port = 80;

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    Concern: String
  });

var contactD = mongoose.model('contactD', contactSchema);



app.use( '/static',express.static('static'));

app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('viwes', path.join(__dirname, 'views'))

app.get("/", (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get("/contact", (req, res)=>{
    // const params = {}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
    var mydata = new contactD(req.body);
    mydata.save().then(()=>{
        // res.send("your data is saved")
        params = {"message": "!!!!!!!!!!!!!!!!Form submited!!!!!!!!!!!!!!!!!!!!!"}
        res.status(200).render("contact.pug", params)

    }).catch(()=>{
        res.send("your data is not saved!!!! TRY AGAIN")
    })
    // console.log(req.body)
})

app.listen(port, ()=>{
    console.log(`this site work on ${port} `)
})

