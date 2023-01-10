const router = require('express').Router();

const {
    getAllTransaction, 
    getSingleTransaction, 
    addTransaction,
    updateTransaction,
    cancelTransaction
} = require('../controllers/transactionController')

router.route('/')
        .get(getAllTransaction)
        .post(addTransaction)

router.route('/:transaction_id')
        .get(getSingleTransaction)
        .put(updateTransaction)
        .delete(cancelTransaction)

router.get('/:transaction_id/orders', getAllOrdersPerTransaction)

module.exports = router;