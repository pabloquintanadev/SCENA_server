const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10

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
        instagram,
        twitter,
        phoneNumber,
        avatar,
        image1,
        image2,
        image3,
        image4,
        description,
        street,
        number,
        postalCode,
        city,
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
                networks:
                    { instagram, twitter },
                phoneNumber,
                avatar,
                images:
                    { image1, image2, image3, image4 },
                role: 'Venue',
                description,
                address:
                    { street, number, postalCode, city },
                capacity
            })
        })
        .then(createdVenue => { res.status(200).json(createdVenue) })
        .catch(err => res.status(500).json(err))
})


// 2. Artist
router.post('/register/artist', (req, res, next) => {

    console.log('------SERVER', req.body)

    const { username,
        email,
        password,
        instagram,
        spotify,
        soundcloud,
        twitter,
        bandcamp,
        phoneNumber,
        bandcamp,
        avatar,
        image1,
        image2,
        image3,
        image4,
        style1,
        style2,
        style3,
        description,
        label } = req.body

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
                style1,
                style2,
                style3,
                bandcamp,
                avatar,
                images:
                    { image1, image2, image3, image4 },
                role: 'Venue',
                label,
                description,
            })
        })
        .then((createdArtist) => {

            console.log('----', createdArtist)
            const { username, email, password, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label } = createdArtist
            const user = {
                username, email, password, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label, bandcamp
            }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 3. Fan
router.post('/register/fan', (req, res, next) => {

    const { username,
        email,
        password,
        avatar,
        likedEvents,
        likedArtists,
        likedVenues } = req.body


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
                likedEvents,
                likedArtists,
                likedVenues
            })
        })
        .then((createdFan) => { res.status(201).json({ createdFan }) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 4. Label
router.post('/register/label', (req, res, next) => {

    const { username,
        email,
        password,
        instagram,
        twitter,
        phoneNumber,
        avatar,
        role,
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
                networks:
                    { instagram, twitter },
                phoneNumber,
                avatar,
                role,
                duty,
                description
            })
        })
        .then((createdLabel) => res.status(201).json(createdLabel ))
        .catch(err => {
            console.log(err)
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
                const { _id, email, username } = foundVenue
                const payload = { _id, email, username }

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

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

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
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// 3. Fan
router.post('/login/fan', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    Fan
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

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
            console.log(err)
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

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

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
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

module.exports = router

