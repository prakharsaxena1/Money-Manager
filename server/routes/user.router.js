const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const { authenticate } = require('../middlewares/authenticate');

router.route('/').get(authenticate, userController.getUserInfo);
router.route('/budget').patch(authenticate, userController.updateUserBudget);

// Exports
module.exports = router;