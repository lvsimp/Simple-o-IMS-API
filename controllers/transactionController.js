//imports 
const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

module.exports.getAllTransaction = (req, res) => {
    knex('transaction')
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send('Something is wrong please try again later.'))
}

module.exports.getSingleTransactio = (req, res) => {
    knex('transaction')
    .where({id: req.params.transaction_id})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Can't find transaction. ${err}`))
}

module.exports.addTransaction = (req, res) => {

    const data = {
        id: uuid(),
        ...req.body
    }


    if(!req.body.customer_name || !req.body.customer_address || !req.body.total_cost ){
        return res.status(400).send('Please provide all required fields');
    }

    knex('transaction')
    .insert(data)
    .then(data => {
        res.status(200).send('New Transaction created', data)
    })
    .catch(err => res.status(400).send(`Could not created transaction`, err))
}

module.exports.updateTransaction = (req, res) => {

    knex('transaction')
    .where({id: req.params.transaction_id})
    .update({...req.body})
    .then(() => {
        res.status(200).send('Transaction updates');
    })
    .catch(err =>{
        res.status(400).send(`Can't update transaction`, err);
    })

}

module.exports.cancelTransaction = (req, res) =>{
    knex('transaction')
    .where({id: req.params.transaction_id})
    .del()
    .then(() =>{
        res.status(200).send('Transaction Cancelled');
    })
    .catch(err => {
        res.status(400).send(`Can't cancel transaction`);
    })
}

module.exports.getAllOrdersPerTransaction = (req, res) => {
    knex('orders')
    .where({transaction_id : req.params.transaction_id})
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(200).send(`Can't find orders for transaction ${err}`))

}