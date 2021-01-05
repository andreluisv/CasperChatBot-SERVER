import express from 'express';
import bodyParser from 'body-parser';
import news from './services/news.service';
import mongoose from 'mongoose';

const cors = require("cors");
require('dotenv').config();

var corsOptions = {
    origin: "*"
};

var port = process.env.PORT || 3333;
const app = express()
app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.json())

app.use(express.static(__dirname+"/public"));

mongoose.connect(process.env.MONGO,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/', news)

const server = app.listen(port,()=>{
    console.log("Server listening on "+port)
})

function closeServer(): void {
    server.close();
}

export { server, closeServer }