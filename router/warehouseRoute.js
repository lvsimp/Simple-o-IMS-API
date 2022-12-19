const router = require('express').Router();
const {
        getAllWarehouse,
        getSingleWarehouse,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse
      } = require('../controllers/warehousesController');

router.route('/')
      .get(getAllWarehouse)
      .post(addWarehouse)

router.route('/:warehouse_id')
      .get(getSingleWarehouse)
      .put(updateWarehouse)
      .delete(deleteWarehouse);

module.exports = router;