const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Label = require('./../models/Label.model')

const saltRounds = 10

router.get('/', (req, res) => {

    Label
        .find()
        .then((labels) => {
            res.status(200).json(labels)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/:labelId', (req, res) => {

    const { labelId } = req.params

    Label
        .findById(labelId)
        .then((label) => {
            res.status(200).json(label)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/search/:labelName', (req, res) => {

    const { labelName } = req.params

    Label
        .find(labelName)
        .then((label) => {
            res.status(200).json(label)
        })
        .catch((err) => res.status(500).json(err))

})

router.post('/register', (req, res, next) => {

    const { username, email, password, instagram, spotify, soundcloud, twitter, phoneNumber, avatar, others, role, duty, description } = req.body

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

            return Label.create({ email, password: hashedPassword, username, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, duty, description })
        })
        .then((createdLabel) => {

            console.log('----', createdLabel)
            const { email, password: hashedPassword, username, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, duty, description } = createdLabel
            const user = { username, password, email, networks: { instagram, spotify, soundcloud, twitter }, phoneNumber, images: { avatar, others }, role, duty, description }

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

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Label
        .findByIdAndDelete(id)
        .then(() => {

            res.status(200).json('Label borrado correctamente')

        })
        .catch((err) => res.status(500).json())

})

module.exports = router
