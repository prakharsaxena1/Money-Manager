const express = require('express');
const router = express.Router();

router.use('/api', require("./account.router"));
router.use('/api/transaction', require("./transaction.router"));
router.use('/api/user', require("./user.router"));

module.exports = router;