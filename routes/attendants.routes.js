const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('Todos los attendants')
})

router.get(':id', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/likedEvents', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/likedArtists', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/likedVenues', (req, res) => {
    const { id } = req.params
    res.json(id)
})

module.exports = router