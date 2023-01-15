const express = require("express");
const router = express.Router();
const transactionController = require('../controllers/transaction.controller')
const { authenticate } = require('../middlewares/authenticate');

// Routes [TRANSACTION]
router.route('/')
    .post(authenticate, transactionController.createTransaction)
    .get(authenticate, transactionController.getTransaction);
router.route('/:id')
    .patch(authenticate, transactionController.updateTransaction)
    .delete(authenticate, transactionController.deleteTransaction);
router.route('/friends')
    .get(authenticate, transactionController.getFriendOwes);

router.route('/dev').get(transactionController.getAllTransaction);
// Exports
module.exports = router;