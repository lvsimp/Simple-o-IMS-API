const router = require('express').Router();
const {
        getAllSupplier,
        getSingleSupplier,
        addSupplier,
        updateSupplier,
        deleteSupplier
      } = require('../controllers/suppliersController');

router.route('/')
      .get(getAllSupplier)
      .post(addSupplier)

router.route('/:supplier_id')
      .get(getSingleSupplier)
      .put(updateSupplier)
      .delete(deleteSupplier);

module.exports = router;