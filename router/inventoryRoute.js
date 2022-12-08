const router = require('express').Router();
const {
        getAllInventory,
        getSingleInventory,
        addInventory, 
        updateInventory, 
        deleteInventory
      } = require('../controllers/inventoriesController');

router.route('/')
      .get(getAllInventory)
      .post(addInventory);

router.route('/:inventory_id')
      .get(getSingleInventory)
      .put(updateInventory)
      .delete(deleteInventory);

module.exports = router;