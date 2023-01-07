//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

//get all warehouse
module.exports.getAllWarehouse = (_req, res) =>{
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 
    knex('warehouses')
        .then( data =>{
            res.status(200).send(data);
        })
        .catch(err => res.status(400).send(`Can't retrieve data ${err}`))
}

//get single warehouse
module.exports.getSingleWarehouse = (req, res) => {
    knex('warehouses')
        .where({id : req.params.warehouse_id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => res.status(400).send(`Can't retrieve data ${err}`));
}

// add warehouse 
module.exports.addWarehouse = (req, res) =>{
    const imagePath = req.file.path;

    if( 
        !req.body.name ||
        !req.body.address
    ){
        res.status(400).send(`Fields are not correctly filled.`)
    }
    knex('warehouses')
    .insert({
        id: uuid(),
        ...req.body,
        images: imagePath.replace('public', '')
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't add warehouse in the database ${err}`));
}

// update warehouse
module.exports.updateWarehouse = (req, res) => {
    const imagePath = req.file.path;

    knex('warehouses')
        .where({id : req.params.warehouse_id})
        .update({...req.body, images: imagePath.replace('public', '')})
        .then(() => {
            res.status(200).send(`Warehouse with id ${req.params.warehouse_id} Updated`);
        })
        .catch(err => res.status(400).send(`the Warehouse with ${req.params.warehouse_id} was not found.`));
}
//delete warehouse
module.exports.deleteWarehouse =(req, res) =>{
    knex('warehouses')
        .where({id : req.params.warehouse_id})
        .del()
        .then(data => {
            res.status(200).send(data,{message: 'Warehouse Deleted from the database.'} );
        })
        .catch( err => res.status(400).send(`Can't delete warehouse.`));
}