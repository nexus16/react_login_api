const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const passport = require("passport");
const path = require("path");
dotenv.config()

const app = express()
const PORT = 8797
const db = mongoose.connection;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect db
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!!!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(passport.initialize());
require("./src/middlewares/jwt")(passport);


require('./src/routes/index')(app);

app.listen(PORT, ()=>{console.log("Server started on "+ PORT)})