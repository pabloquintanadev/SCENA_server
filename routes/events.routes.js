const router = require("express").Router()

const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

router.get('/', (req, res) => {

    Event
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/create', (req, res) => {
    const { username, email, password, phoneNumber, title, date, mainArtist, secondaryArtists, venue, creator, aprovedArtist, aprovedVenue } = req.body

    User
        .create({ username, email, password, phoneNumber })
        .then(createdUser => { Event.create({ user: createdUser._id, title, date, mainArtist, secondaryArtists, venue, isAproved: { mainArtist: aprovedArtist, venue: aprovedVenue}, creator })})
        .then(createdEvent => res.json(createdEvent))
        .catch(err => res.status(500).json(err))

})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Event
        .findById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'deleted correctly' }))
        .catch(err => res.status(500).json(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, date, mainArtist, secondaryArtists, venue, isApproved, creator } = req.body

    Event
        .findByIdAndUpdate(id, { title, date, mainArtist, secondaryArtists, venue, isApproved, creator })
        .then(() => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router