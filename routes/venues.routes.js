const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('Todos los venues')
})

router.get('/:venueId', (req, res) => {
    const { venueId } = req.params
    res.json(venueId)
})

router.get('/search/:venueName', (req, res) => {
    const { venueName } = req.params
    res.json(venueName)
})

router.get('/search/location/:district', (req, res) => {
    const { district } = req.params
    res.json(district)
})

module.exports = router; 