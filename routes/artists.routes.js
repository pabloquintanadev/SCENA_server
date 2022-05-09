const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('/artists')
})

router.get('/:artistId', (req, res) => {
    const { artistId } = req.params
    res.json(artistId)
})

router.get('/search/:artistName', (req, res) => {
    const { artistName } = req.params
    res.json(artistName)
})

router.get('/search/style/:style', (req, res) => {
    const { style } = req.params
    res.json(style)
})

module.exports = router;
