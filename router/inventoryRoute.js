const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "public/inventories");
      },
      filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
      },
    });


const upload = multer({storage: storage});
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