const express = require('express')

const uuid = require('uuid')
const router = express.Router()

//require File Function
const resData = require('../util/restaurant-data.js')

//restaurants HTML
router.get('/restaurants', function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants()
  const numbersRestaurants = storedRestaurants.length
  //!call template
  res.render('restaurants', {
    numberOfRestaurants: numbersRestaurants,
    restaurants: storedRestaurants,
  })
})

//**restaurants/r1 */
//restaurant-details
router.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id
  const storedRestaurants = resData.getStoredRestaurants()
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurantItem: restaurant })
    }
  }

  res.status(404).render('404')
})

//recommend HTML
router.get('/recommend', function (req, res) {
  //!call template
  res.render('recommend')
})

router.post('/recommend', function (req, res) {
  const restaurant = req.body
  //Uniq id
  restaurant.id = uuid.v4()

  //!from util restaurant Data Read
  const restaurants = resData.getStoredRestaurants()
  restaurants.push(restaurant)

  //!from util restaurant Data Write
  resData.storeRestaurants(restaurants)

  //!Switch to a different page.
  res.redirect('/confirm')
})

//confirm HTML
router.get('/confirm', function (req, res) {
  //!call template
  res.render('confirm')
})

module.exports = router
