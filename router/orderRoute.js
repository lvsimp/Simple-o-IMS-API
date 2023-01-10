const router = require('express').Router();

const {
    getAllOrders,
    getSingleOrders,
    addOrders,
    updateOrders,
    deleteOrders
} = require('../controllers/ordersController');

router.route('/')
        .get(getAllOrders)
        .post(addOrders)

router.route('/:order_id')
        .get(getSingleOrders)
        .put(updateOrders)
        .delete(deleteOrders)

module.exports = router;