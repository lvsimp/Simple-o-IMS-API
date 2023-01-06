const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "public/warehouse");
      },
      filename: function (req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
      },
    });


const upload = multer({storage: storage});
const type = upload.single('images');

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
      .put(type,updateWarehouse)
      .delete(deleteWarehouse);

module.exports = router;