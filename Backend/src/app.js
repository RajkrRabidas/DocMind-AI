require("dotenv").config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const authRouter = require('../routes/authRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"], // Allowed HTTP methods
}))

// routes

app.use('/api/auth', authRouter);


module.exports = app;