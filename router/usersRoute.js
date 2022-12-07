const router = require('express').Router();
const auth = require('../auth');
const userController = require('../controllers/usersController');

const {verify, verifyAdmin} = auth;
const {
        getAllUsers, 
        getSingleUser,
        updateProfile, 
        addEmployee, 
        registerUser, 
        loginUser} = userController;
        
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