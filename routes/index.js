const express = require('express')
const router = express.Router()
const passport = require('passport')
const citiesControllers = require('../controllers/citiesControllers')
const itinerariesControllers = require('../controllers/itinerariesControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const userControllers = require('../controllers/userControllers')
const validator = require ('../controllers/validator')

router.route('/cities')
.get(citiesControllers.getAllCities)
.post(citiesControllers.addCity)

router.route('/city/:id')
.get(citiesControllers.getCity)
.delete(citiesControllers.deleteCity)
.put(citiesControllers.modifyCity)

router.route('/itineraries')
.get(itinerariesControllers.getAllItineraries)
.post(itinerariesControllers.addItinerary)

router.route('/itinerary/:id')
.get(itinerariesControllers.getItinerary)
.delete(itinerariesControllers.deleteItinerary)
.put(itinerariesControllers.modifyItinerary)

router.route('/itineraries/:id')
.get(itinerariesControllers.getItinerariesByCity)

router.route('/user/signup')
.post(validator, userControllers.addUser)

router.route('/user/login')
.post(userControllers.logUser)

router.route('/verifyToken')
.get(passport.authenticate('jwt', {session: false}), userControllers.verifyToken)

router.route('/activities')
.get(activitiesControllers.getAllActivities)
.post(activitiesControllers.addActivity)

router.route('/activity/:id')
.get(activitiesControllers.getActivity)
.delete(activitiesControllers.deleteActivity)
.put(activitiesControllers.modifyActivity)

router.route('/activities/:id')
.get(activitiesControllers.getActivitiesByItinerary)

router.route('/likes/:id')
.put(passport.authenticate('jwt', {session: false}), itinerariesControllers.likes)

// Comments.
router.route('/itinerary/pushcomment/:id') 
.put(passport.authenticate('jwt', {session: false}), itinerariesControllers.addComment)


router.route('/itinerary/deletecomment/:id') 
.put(passport.authenticate('jwt', {session: false}), itinerariesControllers.deleteComment)

router.route('/editcomment') 
.put(passport.authenticate('jwt', {session: false}), itinerariesControllers.editComment)

module.exports = router