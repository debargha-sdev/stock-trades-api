const router = require("express").Router();

router.use('/login', require('./login'));
router.use('/trades', require('./trades'));

module.exports = router;