const router = require("express").Router();

// controllers
const loginController = require('../../controller/login');

// login route
router.post('/', loginController.login);

module.exports = router;