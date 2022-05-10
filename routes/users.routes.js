const router = require("express").Router();

const User = require('./../models/User.model')

router.get('/', (req, res) => {
    User
        .find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/register", (req, res) => {

    User
        .create(req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/details/:userId', (req, res) => {
    const { userId } = req.params
    User
        .findById(userId)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})

router.get('/filter/:role', (req, res) => {
    const { role } = req.params
    User
        .find({ role: role })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/edit-profile/:userId', (req, res) => {
    const { UserId } = req.params
    User
        .findByIdAndUpdate(userId, req.body)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})

router.post('/delete/:userId', (req, res) => {
    const { userId } = req.params
    User
        .findByIdAndDelete(userId)
        .then(() => res.status(200))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
