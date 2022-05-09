const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('Todos eventos')
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    res.json(id)
})

module.exports = router