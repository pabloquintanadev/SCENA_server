const router = require("express").Router()

const Venue = require('./../models/Venue.model')
const User = require('./../models/User.model')

router.get('/', (req, res) => {

    Venue
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/:venueId', (req, res) => {
    const { venueId } = req.params

    Venue
        .findById(venueId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/search/:venueName', (req, res) => {
    const { venueName } = req.params

    // User
    //     .find({ username: venueName })
    
    
    // Venue
    //     .find({ name: venueName })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
})

router.get('/search/location/:district', (req, res) => {
    const { district } = req.params



})

module.exports = router