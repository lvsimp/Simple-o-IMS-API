const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest:`public/inventories`});
const type = upload.single('images');

const {
        getAllInventory,
        getDeliveries,
        getSingleInventory,
        addInventory, 
        updateInventory, 
        deleteInventory,
        getTotalQty,
        getOutOfStock,
        getLowestQty
      } = require('../controllers/inventoriesController');

router.route('/')
      .get(getAllInventory)
      .post(type, addInventory)
      
router.get('/dashboard/totalqty', getTotalQty)
router.get('/dashboard/outofstock', getOutOfStock)
router.get('/dashboard/lowestqty', getLowestQty)
router.get('/deliveries',getDeliveries)

router.route('/:inventory_id')
      .get(getSingleInventory)
      .put(type, updateInventory)
      .delete(deleteInventory);

module.exports = router;