require("dotenv").config()
const express = require('express');

const authRouter = require('../routes/authRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use('/api/auth', authRouter);


module.exports = app;