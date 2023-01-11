const router = require('express').Router();

const {
    getAllTransaction, 
    getSingleTransaction, 
    getAllOrdersPerTransaction,
    addTransaction,
    updateTransaction,
    cancelTransaction
} = require('../controllers/transactionController')

router.get('/:transaction_id/orders', getAllOrdersPerTransaction)

router.route('/')
        .get(getAllTransaction)
        .post(addTransaction)

router.route('/:transaction_id')
        .get(getSingleTransaction)
        .put(updateTransaction)
        .delete(cancelTransaction)


module.exports = router;