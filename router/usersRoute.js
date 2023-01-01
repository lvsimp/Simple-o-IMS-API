const router = require('express').Router();
const {verify, verifyAdmin} = require('../auth');
const {
        getAllUsers, 
        getSingleUser,
        updateProfile, 
        addEmployee, 
    } = require('../controllers/usersController');
        
//for login and registration


router.route('/')
    .get( verify, verifyAdmin, getAllUsers)
    .post(verify, verifyAdmin, addEmployee);

router.route('/:user_id')
    .get(verify, getSingleUser)
    .put(verify, updateProfile);

module.exports = router;