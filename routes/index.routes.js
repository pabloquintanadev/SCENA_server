const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//upload routes
router.use("/upload", require('./upload.routes'))

//artists routes
router.use('/artists', require('./artists.routes'))

//fans routes
router.use('/fans', require('./fan.routes'))

//events routes
router.use('/events', require('./events.routes'))

//venues routes
router.use('/venues', require('./venues.routes'))

//labels routes
router.use('/labels', require('./labels.routes'))

//messages routes
router.use('/messages', require('./messages.routes'))

//auth routes
router.use('/auth', require('./auth.routes'))


module.exports = router;
