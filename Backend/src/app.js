require("dotenv").config()
const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require('../routes/authRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes

app.use('/api/auth', authRouter);


module.exports = app;