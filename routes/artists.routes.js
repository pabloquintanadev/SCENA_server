const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Artist = require('./../models/Artist.model')


const saltRounds = 10

router.get('/', (req, res) => {

    Artist
        .find()
        .then((artists) => {
            res.status(200).json(artists)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/:artistId', (req, res) => {

    const { artistId } = req.params

    Artist
        .findById(artistId)
        .then((artist) => {
            res.status(200).json(artist)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/search/:artistName', (req, res) => {

    const { artistName } = req.params

    Artist
        .find(artistName)
        .then((artist) => {
            res.status(200).json(artist)
        })
        .catch((err) => res.status(500).json(err))

})

router.get('/search/style/:style', (req, res) => {

    const { style } = req.params

    Artist
        .find(style)
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

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Artist
        .findByIdAndDelete(id)
        .then(()=>{

            res.status(200).json('Artista borrado correctamente')
            
        })
        .catch((err)=>res.status(500).json())

})

module.exports = router;
