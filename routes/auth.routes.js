const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const { isAuthenticated } = require("../middlewares/jwt.middleware")
const mongoose = require('mongoose');



const Venue = require('./../models/Venue.model')
const Artist = require('./../models/Artist.model')
const Fan = require('./../models/Fan.model')
const Label = require('./../models/Label.model')



// REGISTER
// 1. Venue
router.post('/register/venue', (req, res, next) => {

    const {
        username,
        email,
        password,
        networks,
        phoneNumber,
        avatar,
        images,
        address,
        description,
        capacity
    } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    Venue
        .findOne({ email })
        .then(foundVenue => {

            if (foundVenue) {
                res.status(400).json({ message: "Venue already exists. " })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Venue.create({
                username,
                email,
                password: hashedPassword,
                networks,
                phoneNumber,
                avatar,
                images,
                description,
                address,
                capacity
            })
        })
        .then(createdVenue => {
            const { _id, email, username, role } = createdVenue
            const payload = { _id, email, username, role }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )
            res.status(200).json({ authToken })
        })
        .catch(err => res.status(500).json(err))
})


// 2. Artist
router.post('/register/artist', (req, res, next) => {

    const { username,
        password,
        email,
        phoneNumber,
        description,
        networks: { instagram, spotify, soundcloud, bandcamp, twitter },
        styles,
        avatar,
        images } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    Artist
        .findOne({ email })
        .then((foundArtist) => {

            if (foundArtist) {
                res.status(400).json({ message: "Artist already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Artist.create({
                username,
                email,
                password: hashedPassword,
                networks:
                    { instagram, twitter, spotify, soundcloud, bandcamp },
                phoneNumber,
                styles,
                avatar,
                images,
                description
            })
        })
        .then(createdArtist => {
            const { _id, email, username, role } = createdArtist
            const payload = { _id, email, username, role }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )
            res.status(200).json({ authToken })
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 3. Fan
router.post('/register/fan', (req, res, next) => {

    const { username,
        email,
        password,
        avatar,
    } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    Fan
        .findOne({ email })
        .then((foundFan) => {

            if (foundFan) {
                res.status(400).json({ message: "Fan already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Fan.create({
                email,
                password: hashedPassword,
                username,
                avatar,
            })
        })
        .then((createdFan) => {
            const { _id, email, username, role } = createdFan
            const payload = { _id, email, username, role }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )
            res.status(200).json({ authToken })
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 4. Label
router.post('/register/label', (req, res, next) => {

    const { username,
        email,
        password,
        networks,
        phoneNumber,
        avatar,
        duty,
        description } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return1
    }

    Label
        .findOne({ email })
        .then((foundLabel) => {


            if (foundLabel) {
                res.status(400).json({ message: "Label already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return Label.create({
                email,
                password: hashedPassword,
                username,
                networks,
                phoneNumber,
                avatar,
                duty,
                description
            })
        })
        .then((createdLabel) => {
            const { _id, email, username, role } = createdLabel
            const payload = { _id, email, username, role }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )
            res.status(200).json({ authToken })
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})



// LOGIN
// 1. Venue
router.post('/login/venue', (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    Venue
        .findOne({ email })
        .then(foundVenue => {

            if (!foundVenue) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (bcrypt.compareSync(password, foundVenue.password)) {
                const { _id, email, username, role } = foundVenue
                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }

        })
        .catch(err => res.status(500).json(err))
})


// 2. Artist
router.post('/login/artist', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    Artist
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser

                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 3. Fan
router.post('/login/fan', (req, res, next) => {

    const { email, password } = req.body


    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    Fan
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser

                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 4. Label
router.post('/login/label', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    Label
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser

                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})

//Save to favorites : Artist,Events, or Venues
// 1. FavArtist

router.post('/:role/addArtist/:artistId', (req, res, next) => {

    const { role, artistId } = req.params
    let artist = mongoose.Types.ObjectId(artistId);

    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }

    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $addToSet: { likedArtists: artist } })
        .then(console.log('hecho!'))
        .catch(err => console.log(err))

})

router.post('/:role/deleteArtist/:artistId', (req, res, next) => {


    const { role, artistId } = req.params
    let artist = mongoose.Types.ObjectId(artistId);

    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $pull: { likedArtists: artistId } })
        .then(console.log('Artista borrado'))
        .catch(err => console.log(err))

})

//2.FavEvents

router.post('/:role/addEvent/:eventId', (req, res, next) => {

    const { role, eventId } = req.params
    let event = mongoose.Types.ObjectId(eventId);

    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }

    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $addToSet: { likedEvents: event } })
        .then(console.log('hecho!'))
        .catch(err => console.log(err))

})

router.post('/:role/deleteEvent/:eventId', (req, res, next) => {


    const { role, eventId } = req.params

    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $pull: { likedEvents: eventId } })
        .then(console.log('Evento borrado'))
        .catch(err => console.log(err))

})

//3.FavVenues

router.post('/:role/addVenue/:venueId', (req, res, next) => {

    const { role, venueId } = req.params
    let venue = mongoose.Types.ObjectId(venueId);
    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }

    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $addToSet: { likedVenues: venue } })
        .catch(err => console.log(err))

})

router.post('/:role/deleteVenue/:venueId', (req, res, next) => {


    const { role, venueId } = req.params

    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findByIdAndUpdate(req.body.loggedUserId, { $pull: { likedVenues: venueId } })
        .then(console.log('Evento borrado'))
        .catch(err => console.log(err))

})

router.post('/:role/checkArtist/:artistId', (req, res, next) => {

    const { role, artistId } = req.params
    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findById(req.body.loggedUserId)
        .then((user) => {
            let result =
                user.likedArtists.map((elem) => {
                    if (elem.toString() == artistId) {
                        return true
                    }
                    else {
                        return false
                    }
                })
            return result
        })
        .then((result) => {
            if (result.includes(true)) {
                res.json(true)
            } else {
                res.json(false)
            }

        })
        .catch(err => console.log(err))
})

router.post('/:role/checkVenue/:venueId', (req, res, next) => {

    const { role, venueId } = req.params
    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findById(req.body.loggedUserId)
        .then((user) => {
            let result =
                user.likedVenues.map((elem) => {
                    if (elem.toString() == venueId) {
                        return true
                    }
                    else {
                        return false
                    }
                })
            return result
        })
        .then((result) => {
            if (result.includes(true)) {
                res.json(true)
            } else {
                res.json(false)
            }

        })
        .catch(err => console.log(err))
})

router.post('/:role/checkEvent/:eventId', (req, res, next) => {

    const { role, eventId } = req.params
    let modelConversion

    if (role === 'Fan') {
        modelConversion = Fan
    } else if (role === 'Artist') {
        modelConversion = Artist
    } else if (role === 'Venue') {
        modelConversion = Venue
    }
    modelConversion
        .findById(req.body.loggedUserId)
        .then((user) => {
            let result =
                user.likedEvents.map((elem) => {
                    if (elem.toString() == eventId) {
                        return true
                    }
                    else {
                        return false
                    }
                })
            return result
        })
        .then((result) => {
            if (result.includes(true)) {
                res.json(true)
            } else {
                res.json(false)
            }

        })
        .catch(err => console.log(err))
})

module.exports = router

