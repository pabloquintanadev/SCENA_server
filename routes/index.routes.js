const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/artists', require('./artists.routes'))
router.use('/fans', require('./fan.routes'))
router.use('/events', require('./events.routes'))
router.use('/venues', require('./venues.routes'))
router.use('/labels', require('./labels.routes'))
router.use('/auth', require('./auth.routes'))


module.exports = router;
