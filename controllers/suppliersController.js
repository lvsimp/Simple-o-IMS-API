//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

//get all supplier
module.exports.getAllSupplier = (req, res) =>{
    knex('suppliers')
        .then( data =>{
            res.status(200).send(data);
        })
        .catch(err => res.status(400).send(`Can't retrieve data ${err}`))
}

//get single supplier
module.exports.getSingleSupplier = (req, res) => {
    knex('suppliers')
        .where({id : req.params.supplier_id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => res.status(400).send(`Can't retrieve data ${err}`));
}

// add supplier 
module.exports.addSupplier = (req, res) =>{

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
        !req.body.address ||
        !req.body.phone || 
        !req.body.email ||
        !req.body.contact_person
    ){
        res.status(400).send(`Fields are not correctly filled.`)
    }
    knex('suppliers')
    .insert(data)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't add supplier in the database ${err}`));
}

// update supplier
module.exports.updateSupplier = (req, res) => {
    
    const data = {
        ...req.body
    }

    if(typeof req.file === 'object'){
        const imagePath = req.file.path;
        data.images = imagePath.replace('public', '')
    }

    knex('suppliers')
        .where({id : req.params.supplier_id})
        .update(data)
        .then(() => {
            res.status(200).send(`Supplier with id ${req.params.supplier_id} Updated`);
        })
        .catch(err => res.status(400).send(`the Supplier with ${req.params.supplier_id} was not found.`));
}
//delete supplier
module.exports.deleteSupplier =(req, res) =>{
    knex('suppliers')
        .where({id : req.params.supplier_id})
        .del()
        .then(data => {
            res.status(200).send(data,{message: 'Supplier Deleted from the database.'} );
        })
        .catch( err => res.status(400).send(`Can't delete supplier.`));
}