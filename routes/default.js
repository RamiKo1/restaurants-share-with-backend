const express = require('express')

const router = express.Router()
//index HTML
router.get('/', function (req, res) {
  //!call template
  res.render('index')
})

//About HTML
router.get('/about', function (req, res) {
  //!call template
  res.render('about')
})

module.exports = router
