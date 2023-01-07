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
        getAllSupplier,
        getSingleSupplier,
        addSupplier,
        updateSupplier,
        deleteSupplier
      } = require('../controllers/suppliersController');

router.route('/')
      .get(getAllSupplier)
      .post(type, addSupplier)

router.route('/:supplier_id')
      .get(getSingleSupplier)
      .put( type, updateSupplier)
      .delete(deleteSupplier);

module.exports = router;