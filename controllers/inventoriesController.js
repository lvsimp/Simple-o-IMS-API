//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');


//get all inventory
module.exports.getAllInventory = (req, res) =>{
    knex('inventories')
    .select('inventories.id as id',
        'inventories.name as name' ,
        'inventories.description as description',
        'inventories.price as price', 
        'inventories.quantity as quantity', 
        'inventories.images as images',
        'warehouses.name as warehouse' , 
        'suppliers.name as supplier', 
        'categories.type as category')
    .join('suppliers', {'inventories.supplier_id' : 'suppliers.id'})
    .join('warehouses', {'inventories.warehouse_id' : 'warehouses.id'})
    .join('categories', {'inventories.category_id' : 'categories.id'})
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

    const data = {
        id: uuid(),
        ...req.body
    }

    if(typeof req.file === 'object'){
        const imagePath = req.file.path;
        data.images = imagePath.replace('public', '')
    }


    if(
        !req.body.name ||
        !req.body.description || 
        !req.body.price ||
        !req.body.quantity||
        !req.body.category_id ||
        !req.body.supplier_id ||
        !req.body.warehouse_id
    ){
        return res.status(400).send(`Please fill up all the fields.`);
    }


    knex('inventories')
        .insert(data)
        .then(data => res.status(200).send(`Inventory has been added.`))
        .catch(err => res.status(400).send(`Can't create inventory.`));

}

//update inventory
module.exports.updateInventory = (req, res) => {

    const data = {
        ...req.body
    }

    if(typeof req.file === 'object'){
        const imagePath = req.file.path;
        data.images = imagePath.replace('public', '')
    }

    knex('inventories')
        .where({id : req.params.inventory_id})
        .update(data)
        .then(data => {
            res.status(200).send(`Inventory with id ${data.id} has been updated.`);
        })
        .catch(err => res.status(400).send(`Can't update inventory with id ${req.params.inventory_id} ${err}`));
}

//delete inventory
module.exports.deleteInventory = (req, res) => {
    knex('inventories')
        .where({id : req.params.inventory_id})
        .del()
        .then(() => res.status(200).send(`Deleted Inventory`))
        .catch(err => res.status(400).send(`Can't Delete Inventory`));
}

module.exports.getDeliveries = (req, res) =>{

    knex('inventories')
        .select('inventories.id as id','inventories.updated_on as dateDelivered', 'suppliers.name as supplier', 'warehouses.name as warehouse', 'inventories.name as item' )
        .join('suppliers', {'inventories.supplier_id' : 'suppliers.id'})
        .join('warehouses', {'inventories.warehouse_id' : 'warehouses.id'})
        .orderBy('dateDelivered', 'desc')
        .limit(5)
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err => res.status(400).send(err));

}

module.exports.getTotalQty = (req, res) => {
    knex('inventories')
    .sum('quantity as qty')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

module.exports.getLowestQty = (req, res) =>{
    knex('inventories')
    .min('quantity as qty')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));


}

module.exports.getOutOfStock = (req, res) => {
    knex('inventories')
    .where('quantity', '=', 0)
    .count('quantity as qty')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}