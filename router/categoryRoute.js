const router = require('express').Router();
const {
    getAllCategory,
    getSingleCategory, 
    addCategory,
    updateCategory,
    deleteCategory
} =  require('../controllers/categoriesController');


router.route('/')
    .get(getAllCategory)
    .post(addCategory);

router.route('/:category_id')
    .get(getSingleCategory)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = router;