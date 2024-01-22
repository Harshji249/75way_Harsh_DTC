import express from 'express'
import bodyParser from 'body-parser';
import dotenv from "dotenv"
const connectToMongo = require('./db')
const cookieParser = require('cookie-parser');
dotenv.config()
connectToMongo()
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 3000

app.use('/api/auth', require('./routes/auth'))
app.use('/api/child', require('./routes/child'))
app.use('/api/parent', require('./routes/parent'))
app.use('/api/teacher', require('./routes/teacher'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})