const router = require("express").Router()

const Message = require('./../models/Message.model')

router.get('/:userId', (req, res) => {

    const { userId } = req.params

    Message
        .find({ destination: userId })
        .populate('originArtist originVenue originLabel')
        .then(messages => res.json(messages))
        .catch(err => res.status(500).json(err))
})

router.post('/create', (req, res) => {

    const { origin, destination, textContent } = req.body

    Message
        .create(req.body)
        .then(message => res.status(200).json(message))
        .catch(err => res.status(500).json(err))
})

router.post('/edit/:messageId', (req, res) => {

    const { messageId } = req.params
    console.log('HEYYYYY')

    Message
        .findByIdAndUpdate(messageId, { answered: true })
        .then(message => res.status(200))
        .catch(err => res.json(err))
})

router.post('/delete/:messageId', (req, res) => {

    const { messageId } = req.params

    Message
        .findByIdAndDelete(messageId)
        .then(() => res.status(200))
        .catch(err => res.status(500).json(err))
})





module.exports = router
