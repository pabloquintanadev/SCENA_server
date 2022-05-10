const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Fan = require('./../models/Fan.model')

const saltRounds = 10

router.get('/', (req, res) => {

    Fan
        .find()
        .populate('likedEvents likedArtists likedVenues')
        .populate()
        .then((fans) => {
            res.status(200).json(fans)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/:fanId', (req, res) => {

    const { fanId } = req.params

    Fan
        .findById(fanId)
        .populate('likedEvents likedArtists likedVenues')
        .then((fan) => {
            res.status(200).json(fan)
        })
        .catch((err) => res.status(500).json(err))

})

router.post('/register', (req, res, next) => {

    const { username, email, password, instagram, spotify, soundcloud, twitter, phoneNumber, avatar, others, role, likedEvents, likedArtists, likedVenues } = req.body

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

            return Fan.create({ email, password: hashedPassword, username, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, likedEvents, likedArtists, likedVenues })
        })
        .then((createdFan) => {

            console.log('----', createdFan)
            const { username, email, password, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, styles, description, label } = createdFan
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

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Fan
        .findByIdAndDelete(id)
        .then(() => {

            res.status(200).json('Fan borrado correctamente')

        })
        .catch((err) => res.status(500).json())

})

module.exports = router