const express = require('express')
const { createUser, bookVisit, getAllBookings,allFav, cancelBooking, toFav } = require('../controllers/userCntr')
const jwtCheck = require('../config/auth0Config')

const router = express.Router()

router.post('/register' ,createUser)
router.post("/bookVisit/:id", bookVisit)
router.post('/allbooking', getAllBookings)
router.post('/cancelBooking/:id', cancelBooking)
router.post('/favorite/:rid', toFav)
router.post('/allfavorite', allFav)
module.exports = router