const router = require("express").Router();

router.get("/api", (req, res, next) => {
  res.json("All good in here");
});

router.use('/artists', require('./artists.routes'))
router.use('/users', require('./users.routes'))
router.use('/fan', require('./fan.routes'))
router.use('/events', require('./events.routes'))
router.use('/venues', require('./venues.routes'))
router.use('/labels', require('./labels.routes'))

module.exports = router;
