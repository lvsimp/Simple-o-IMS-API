//imports
const bcrypt = require('bcrypt');
const knex = require("knex")(require("../knexfile"));
const auth = require('../auth');
const {createAccessToken} = auth;
const {v4 : uuid} = require('uuid');


//get all users
module.exports.getAllUsers = (_req, res) => {
    knex('users')
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => res.status(400).send(err));
}

//get user-profile
module.exports.getUserProfile =(req, res) => {
    if(req.user){
        res.json({user: req.user})
    }
}

//get single user by id
module.exports.getSingleUser = (req, res) => {
    knex('users')
    .where({id: req.params.user_id})
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(`Can't get User with id ${req.params.user_id} ${err}`);
      });
}
//registration of users/clients
module.exports.registerUser = (req, res) => {

    if(
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.role
      ){
        return res.status(400).send({message: 'Please fill out all required fields.'})
    }

    const hashedPass = bcrypt.hashSync(req.body.password, 10)
    const newUser = {
        id: uuid(), 
        ...req.body,
        password : hashedPass
    }

    knex('users')
    .insert(newUser)
    .then(data => {
        res.status(200).json({success:true});
    })
    .catch(err => {
        res.status(500).send(`Could not add new user try again later.`)
    })
}

//login user 
module.exports.loginUser = (req, res) =>{

    knex('users')
        .where({email : req.body.email})
        .then(result => {
           if(result !== null){
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
               
                if(isPasswordCorrect){
                    return res.status(200).send({accessToken: createAccessToken(result[0])});
                }else {
                    res.status(400).send({message: 'Error Signing in. Invalid email/password combination.'});
                }
            }else{
                return res.status(400).send({message: 'No User Found'});
            }
        })
        .catch(err => res.status(400).send({message: `can't login user ${err}`}));
}

// adding new employee by admin/owner
module.exports.addEmployee = (req, res) => {
  
    if( !req.body || 
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.username ||
        !req.body.password ||
        !req.body.role
      ){
        return res.status(400).send({message: 'Please fill out all required fields.'})
    }

    const hashedPass = bcrypt.hashSync(req.body.password, 10)
    const newEmployee = {
        id: uuid(), 
        ...req.body,
        password : hashedPass,
        created_by: req.params.user_id,
        updated_by: req.params.user_id
    }

    knex('users')
    .insert(newEmployee)
    .then(data => {
        res.status(200).send(`New Employee Added`);
    })
    .catch(err => {
        res.status(500).send(`Could not add new Employee try again later.`)
    })
}

//updating employee profile
module.exports.updateProfile = (req, res) => {
    
    knex('users')
    .where({id : req.params.user_id})
    .update({...req.body})
    .then(() => {
        res.status(200).send(`${req.body.first_name} profile has been updated`);
    })
    .catch(err => {
        res.status(400).send(`Could not update ${req.body.first_name} profile`);
    });
}

//deleting employees
module.exports.deleteEmployee = (req, res) =>{

}