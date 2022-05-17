const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10

const Venue = require('./../models/Venue.model')

router.get('/', (req, res) => {

    Venue
        .find()
        .then(venues => res.json(venues))
        .catch(err => res.status(500).json(err))
})

router.get('/:venueId', (req, res) => {
    const { venueId } = req.params

    Venue
        .findById(venueId)
        .then(venue => {
            console.log('estoy en serveeeeeeeeeerrrrrr<<<<<<<<', venue)
            res.json(venue)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/search/:venueName', (req, res) => {
    const { venueName } = req.params

    Venue
        .findOne({ username: venueName })
        .then(venue => res.json(venue))
        .catch(err => res.status(500).json(err))
})

router.get('/search/location/:district', (req, res) => {
    const { district } = req.params

    // ######### FUMADITA

})

router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params

    Venue
        .findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'Venue deleted correctly' }))
        .catch(err => res.status(500).json(err))
})

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params
    const { username,
        email,
        networks: { instagram, twitter },
        phoneNumber,
        avatar,
        description,
        address: {
            street,
            number,
            postalCode,
            city,
        },
        capacity } = req.body

    Venue
        .findByIdAndUpdate(id, { username, email, networks: { instagram, twitter }, phoneNumber, avatar, role: 'Venue', description, address: { street, number, postalCode, city }, capacity })
        .then(() => res.status(200).json({ message: 'Venue edited correctly' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router