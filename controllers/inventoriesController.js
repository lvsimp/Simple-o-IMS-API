//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

//get all inventory
module.exports.getAllInventory = (req, res) =>{
    knex('inventories')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't retrieve inventory list`));
}



//get single inventory
module.exports.getSingleInventory = (req, res) => {
    knex('inventories')
    .where({id : req.params.inventory_id})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't retrieve inventory with id ${req.params.inventory_id}`));
}


//add inventory
module.exports.addInventory = (req, res) => {
    if(
        !req.body.name ||
        !req.boody.description || 
        !req.body.price ||
        !req.body.quantity||
        !req.body.category_id ||
        !req.body.supplier_id ||
        !req.body.warehouse_id
    ){
        return res.status(400).send(`Please fill up all the fields.`);
    }
    knex('inventories')
        .insert({id: uuid(), ...req.body})
        .then(data => res.status(200).send(`Inventory has been added.`))
        .catch(err => res.status(400).send(`Can't create inventory.`));

}

//update inventory
module.exports.updateInventory = (req, res) => {
    knex('inventories')
        .where({id : req.params.inventory_id})
        .update({...req.body})
        .then(data => {
            res.status(200).send(`Inventory with id ${data.id} has been updated.`);
        })
        .catch(err => res.status(400).send(`Can't update inventory with id ${req.params.inventory_id}`));
}

//delete inventory
module.exports.deleteInventory = (req, res) => {
    knex('inventories')
        .where({id : req.params.inventory_id})
        .del()
        .then(() => res.status(200).send(`Deleted Inventory`))
        .catch(err => res.status(400).send(`Can't Delete Inventory`));
}