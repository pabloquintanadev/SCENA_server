const router = require("express").Router();

const Label = require('./../models/Label.model')

router.get('/', (req, res) => {
    Label
        .find()
        .then(labels => res.status(200).json(labels))
        .catch((err) => res.status(500).json(err))
})

router.get('/:labelId', (req, res) => {
    const { labelId } = req.params
    Label
        .findById(LabelId)
        .then(labels => res.status(200).json(labels))
        .catch((err) => res.status(500).json(err))
})

//??? ESTA RUTA SIRVE?

router.get('/search/:labelName', (req, res) => {
    const { labelName } = req.params
    res.json(labelName)
})

router.post('/register', (req, res) => {
    const {
        username,
        email,
        password,
        phoneNumber,
        description,
        duty
    } = req.body

    User
        .create({
            username,
            email,
            password
        })
        .then((userCreated) => {
            Label
                .create({ user: userCreated._id, description, duty })
                .then((label) => {
                    res.status(500).json(label)
                })
        })
        .catch((err) => res.status(500).json(err))
})

router.post('/delete/:labelId', (req, res) => {
    const { labelId } = req.params
    Label
        .findById(labelId)
        .populate('User')
        .then(label => {
            const { user } = label
            console.log(user)
            User
                .findByIdAndDelete(user)
                .catch(err => res.status(500).json(err))

        })
        .catch(err => res.status(500).json(err))

    // Label
    //     .findByIdAndDelete(labelId)
    //     .catch(err => res.status(500).json(err))
})


module.exports = router;
