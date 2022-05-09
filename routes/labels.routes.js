const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('Esto es labels básico')
})

router.get('/:labelId', (req, res) => {
    const { labelId } = req.params
    res.json(labelId)
})

router.get('/search/:labelName', (req, res) => {
    const { labelName } = req.params
    res.json(labelName)
})

router.post('/register', (req, res) => {
    res.json('Esto es el registro')
})

module.exports = router;
