const router = require("express").Router()

const Event = require('./../models/Event.model')

router.get('/', (req, res) => {

    Event
        .find()
        .populate('mainArtist secondaryArtists venue')
        .then(events => res.json(events))
        .catch(err => res.status(500).json(err))
})

router.post('/create', (req, res) => {
    const { title, date, mainArtist, secondaryArtists, venue, aprovedArtist, aprovedVenue, creator } = req.body

    Event
        .create({ title, date, mainArtist, secondaryArtists, venue, isAproved: { mainArtist: aprovedArtist, venue: aprovedVenue }, creator })
        .then(createdEvent => res.json(createdEvent))
        .catch(err => res.status(500).json(err))

})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Event
        .findById(id)
        .populate('mainArtist secondaryArtists venue')
        .then(event => res.json(event))
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
    const { title, date, mainArtist, secondaryArtists, venue, aprovedArtist, aprovedVenue, creator } = req.body

    Event
        .findByIdAndUpdate(id, { title, date, mainArtist, secondaryArtists, venue, isAproved: { mainArtist: aprovedArtist, venue: aprovedVenue }, creator })
        .then(() => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router