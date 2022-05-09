const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('Todos los usuarios')
})

router.get('/details/:userId', (req, res) => {
    const { userId } = req.params
    res.json(userId)
})

router.get('/filter/:role', (req, res) => {
    const { role } = req.params
    res.json(role)
})

router.post('/edit-profile/:id', (req, res) => {
    const { id } = req.params
    res.json(id)
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    res.json(id)
})

module.exports = router;
