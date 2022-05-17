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

router.get('/details/:artistId', (req, res) => {

    const { artistId } = req.params
    const _id = artistId

    Artist
        .findById(artistId)
        .populate('myEvents')
        .then((artist) => res.status(200).json(artist))
        .catch((err) => console.log(err))
})

router.get('/search/:username', (req, res) => {

    const { username } = req.params

    Artist
        .find({ username })
        .populate('label')
        .then((artist) => {
            res.status(200).json({ artist })
        })
        .catch((err) => res.status(500).json(err))
})

router.get('/search/style/:style', (req, res) => {

    const { style } = req.params

    Artist
        .find({
            $or: [
                { 'style1': style },
                { 'style2': style },
                { 'style3': style }
            ]
        })
        .populate('label')
        .then((artist) => {
            res.status(200).json(artist)
        })
        .catch((err) => res.status(500).json(err))
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

router.post('/edit/:id', (req, res) => {

    const { id } = req.params
    const { username, email, phoneNumber, description, networks: { instagram, twitter, spotify, soundcloud, bandcamp }, styles, avatar, images } = req.body

    Artist
        .findByIdAndUpdate(id, { username, email, phoneNumber, description, networks: { instagram, twitter, spotify, soundcloud, bandcamp }, styles, avatar, images })
        .then(() => res.status(200).json('Fan editado correctamente'))
        .catch(err => res.status(500).json())
})


module.exports = router;


