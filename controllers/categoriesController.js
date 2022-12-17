//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

//get all category
module.exports.getAllCategory = (req, res) =>{
    knex('categories')
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send('Something is wrong please try again later'));
}

//get single category
module.exports.getSingleCategory =(req, res) =>{
    knex('categories')
    .where({id : req.params.category_id})
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(200).send(`Can't find Category ${err}`))
}

//add category
module.exports.addCategory = (req, res) => {
    if(!req.body.type){
        return res.status(400).send("Please provide all the required field");
    }
    knex('categories')
    .insert({id: uuid(), ...req.body})
    .then((data) => {
        res.status(200).send(`New Category created`);
      })
      .catch((err) => {
        res
          .status(500)
          .send(`Could not create a category entry in the database`);
      })
}

//edit category
module.exports.updateCategory = (req, res) => {
    knex('categories')
    .where({ id: req.params.category_id })
    .update({...req.body})
    .then(() => {
        res.status(200).send('Category Updated');
    })
    .catch(err => res.status(400).send("Can't Update Category"))
}

//delete category
module.exports.deleteCategory = (req, res) => {
    knex('categories')
    .where({ id : category_id})
    .del()
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Error in deleting ${err}`));
}