//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

//get all warehouse
module.exports.getAllWarehouse = (_req, res) =>{
    knex('warehouses')
        .select('warehouses.id as id',
                'warehouses.name as name',
                'warehouses.address as address',
                'warehouses.images as images',
                'inventories.quantity as item_count')
        .join('inventories', {'warehouses.id' : 'inventories.warehouse_id'})
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
    
    const data = {
        id: uuid(),
        ...req.body
    }

    if(req.file && req.file.path){
        data.images = imagePath.replace('public', '')
    }


    if( 
        !req.body.name ||
        !req.body.address
    ){
        res.status(400).send(`Fields are not correctly filled.`)
    }
    knex('warehouses')
    .insert()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't add warehouse in the database ${err}`));
}

// update warehouse
module.exports.updateWarehouse = (req, res) => {
    const data = {
        ...req.body
    }
    
    if(typeof req.file === 'object'){
        const imagePath = req.file.path;
        data.images = imagePath.replace('public', '');
    }

    knex('warehouses')
        .where({id : req.params.warehouse_id})
        .update(data)
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

//item count 
module.exports.getItemCount =(req, res)=>{

    knex('inventories')
    .select('warehouse_id')
    .sum('quantity')
    .groupBy('warehouse_id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))

}