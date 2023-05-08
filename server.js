const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require('./routes/routes');

mongoose.set('strictQuery', false);

// DB Config
mongoose.connect("mongodb://127.0.0.1:27017/ThamilSangam", {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(()=>{});

const db = mongoose.connection

db.on('error', (err)=>{
	console.log(`${err} \n database connection failed. exiting now...`)
})
db.once('open', ()=>{
	console.log("db connection established!")
})

const app = express();

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

// Assigning port
const port = process.env.port || 8000
app.listen(port, function(){
	console.log(`App is running on Port ${port}`);
});

app.use('/api', routes)
