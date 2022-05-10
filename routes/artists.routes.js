const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Artist = require('./../models/Artist.model')


const saltRounds = 10

router.get('/', (req, res) => {

    Artist
        .find()
        .populate('label')
        .then((artists) => {

            res.status(200).json(artists)

        })
        .catch((err) => res.status(500).json(err))

})

router.get('details/:artistId', (req, res) => {

    const { artistId } = req.params

    Artist
        .findById(artistId)
        .populate('label')
        .then((artist) => {
            res.status(200).json(artist)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/search/:username', (req, res) => {

    const { username } = req.params

    Artist
        .find({username})
        .populate('label')
        .then((artist) => {
            console.log(artist)
            res.status(200).json({artist})
        })
        .catch((err) => console.log('hola    ',err))

})

router.get('/search/style/:style', (req, res) => {

    const { style } = req.params

    Artist
        .find({style})
        .populate('label')
        .then((artist) => {
            res.status(200).json(artist)
        })
        .catch((err) => res.status(500).json(err))

})

router.post('/register', (req, res, next) => {

    const { username, email, password, instagram, spotify, soundcloud, twitter, phoneNumber, avatar, others, role, styles, description, label } = req.body

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
                email, password: hashedPassword, username, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label
            })
        })
        .then((createdArtist) => {

            console.log('----', createdArtist)
            const { username, email, password, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label } = createdArtist
            const user = {
                username, email, password, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label
            }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.post('/login', (req, res, next) => {

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

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Artist
        .findByIdAndDelete(id)
        .then(() => {

            res.status(200).json('Artista borrado correctamente')

        })
        .catch((err) => res.status(500).json())

})

module.exports = router;
