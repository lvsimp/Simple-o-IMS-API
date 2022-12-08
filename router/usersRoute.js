const router = require('express').Router();
const {verify, verifyAdmin} = require('../auth');
const {
        getAllUsers, 
        getSingleUser,
        updateProfile, 
        addEmployee, 
        registerUser, 
        loginUser} = require('../controllers/usersController');
        
//for login and registration
router.post('/register', registerUser);
router.post('/login', loginUser);


router.route('/')
    .get(getAllUsers);

router.route('/:user_id')
    .get(getSingleUser)
    .put(updateProfile)
    .post(verify, verifyAdmin, addEmployee);

module.exports = router;