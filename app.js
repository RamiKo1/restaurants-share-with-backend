//package path
const path = require('path')

//require default Routes Template index / About
const defaultRoutes = require('./routes/default.js')

//require restaurant Routes Template
const restaurantRoutes = require('./routes/restaurants.js')

const express = require('express')

const app = express()

//** EJS */
app.set('views', path.join(__dirname, 'views'))
//use a template engine EJS
app.set('view engine', 'ejs')

//To apply CSS JS in Public Folder
app.use(express.static('public'))
//method that will set up a body parser
app.use(express.urlencoded({ extended: false }))

//!use from folder routes
app.use('/', defaultRoutes)
app.use('/', restaurantRoutes)

//!If wrong Url display page 404
app.use(function (req, res) {
  res.status(404).render('404')
})

//!wrong on the server
app.use(function (error, req, res, next) {
  res.status(500).render('500')
})
app.listen(3000)
