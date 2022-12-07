//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuuid');

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
        .then(data => {
            res.status(200).send(data)''
        })
        .catch(err => res.status(400).send(`Can't retrieve data ${err}`));
}

// add supplier 
module.exports.addSupplier = (req, res) =>{
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
    .insert({
        id: uuid(),
        ...req.body
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't add supplier in the database ${err}`));
}

// update supplier
module.exports.updateSupplier = (req, res) => {
    knex('suppliers')
        .where({id : req.body.supplier_id})
        .update({...req.body})
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