const router = require('express').Router();
const categoryController = require('../controllers/categoriesController');

const {
    getAllCategory,
    getSingleCategory, 
    addCategory,
    updateCategory,
    deleteCategory
} = categoryController;

router.route('/')
    .get(getAllCategory)
    .post(addCategory);

router.route('/:category_id')
    .get(getSingleCategory)
    .put(updateCategory)
    .delete(deleteCategory);


module.exports = router;