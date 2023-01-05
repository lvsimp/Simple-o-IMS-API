//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');
// const multer = require('multer');

// const storage = multer.diskStorage({
//         destination: function (req, file, cb){
//             cb(null, 'public/inventories');
//         }, 
//         filename: function (req, file, cb){
//             cb(null, file.originalname);
//         }
// });
// const upload = multer({storage: storage});


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

    const imagePath = req.file.path;

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
        .insert({id: uuid(), ...req.body, images:imagePath.replace('public', '')})
        .then(data => res.status(200).send(`Inventory has been added.`))
        .catch(err => res.status(400).send(`Can't create inventory.`));

}

//update inventory
module.exports.updateInventory = (req, res) => {

    const imagePath = req.file.path;
    console.log(imagePath)

    knex('inventories')
        .where({id : req.params.inventory_id})
        .update({...req.body, images:imagePath.replace('public', '')})
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
    .sum('quantity')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

module.exports.getLowestQty = (req, res) =>{
    knex('inventories')
    .min('quantity')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));


}

module.exports.getOutOfStock = (req, res) => {
    knex('inventories')
    .where('quantity', '=', 0)
    .count('quantity')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}