const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Fan = require('./../models/Fan.model')

const saltRounds = 10

router.get('/', (req, res) => {

    Fan
        .find()
        .populate('likedEvents')
        .populate('likedArtists')
        .populate('likedVenues')
        .then((fans) => {
            res.status(200).json(fans)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/:fanId', (req, res) => {

    const { fanId } = req.params

    Fan
        .findById(fanId)
        .populate('likedEvents')
        .populate('likedArtists')
        .populate('likedVenues')
        .then((fan) => {
            res.status(200).json(fan)
        })
        .catch((err) => res.status(500).json(err))

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