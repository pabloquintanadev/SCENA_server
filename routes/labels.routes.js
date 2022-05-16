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

router.get('/details/:labelId', (req, res) => {

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

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Label
        .findByIdAndDelete(id)
        .then(() => res.status(200).json('Label borrado correctamente'))
        .catch((err) => res.status(500).json())
})

router.post('/edit/:id', (req, res) => {

    const { id } = req.params
    const { username, email, networks: { instagram, twitter }, phoneNumber, avatar, description, duty } = req.body

    Label
        .findByIdAndUpdate(id, { username, email, networks: {instagram, twitter}, phoneNumber, avatar, description, duty })
        .then(() => res.status(200).json('Label editado correctamente'))
        .catch((err) => res.status(500).json())
})


module.exports = router
