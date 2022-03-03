const router = require("express").Router();

router.get('/', (req, res) => {
    // res.json({success: true, message: "Server running"});
    res.sendFile("static/index.html")
})

router.use('/api/v1', require('./v1'));

module.exports = router;