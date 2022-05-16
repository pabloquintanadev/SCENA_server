const router = require("express").Router()

const Event = require('./../models/Event.model')
const Artist = require('./../models/Artist.model')
const Venue = require('./../models/Venue.model')



router.get('/', (req, res) => {

    Event
        .find()
        .populate('mainArtist supportingArtists venue')
        .then(events => res.json(events))
        .catch(err => res.status(500).json(err))
})

router.post('/create', (req, res, next) => {
    const { title, date, image, mainArtist, supportingArtists, venue, aprovedArtist, aprovedVenue, creator, description } = req.body

    Event
        .create({ title, date, image, mainArtist, supportingArtists, venue, isAproved: { mainArtistCheck: aprovedArtist, venueCheck: aprovedVenue }, creator, description })
        .then(createdEvent => {

            const promises = [
                Artist.findByIdAndUpdate(createdEvent.mainArtist._id, { $push: { myEvents: createdEvent._id } }),
                Venue.findByIdAndUpdate(createdEvent.venue._id, { $push: { myEvents: createdEvent._id } }),
            ]

            Promise
                .all(promises)
                .then(([updatedArtist, updatedVenue]) => next())
                .catch(err => next(err))

            createdEvent.supportingArtists.map(element => {
                Artist
                    .findByIdAndUpdate(element, { $push: { myEvents: createdEvent._id } })
                    .then(artist => next())
                    .catch(err => next(err))
            })
        })
        .then(()=> res.json())
        .catch(err => console.log(err))
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
    const { title, date, image, mainArtist, supportingArtists, venue, isAproved: { mainArtist: aprovedArtist, venue: aprovedVenue }, creator, description } = req.body

    Event
        .findByIdAndUpdate(id, { title, date, image, mainArtist, supportingArtists, venue, isAproved: { mainArtist: aprovedArtist, venue: aprovedVenue }, creator, description })
        .then(() => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router