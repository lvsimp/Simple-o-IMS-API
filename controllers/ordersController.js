const knex = require('knex')(require('../knexfile'));
const {v4 : uuid} = require('uuid');

module.exports.getAllOrders = (req, res) => {
    knex('orders')
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(400).send('Something is wrong please try again later')
    })
}

module.exports.getSingleOrders = (req, res) => {
    knex('orders')
    .where({id : req.params.order_id})
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(200).send(`Can't find order ${err}`))
}

module.exports.addOrders = (req, res) => {
    if(!req.body.transaction_id ||
        !req.body.item_id ||
        !req.body.quantity ||
        !req.body.subtotal)
    knex('orders')
    .insert({id: uuid(), ...req.body})
    .then(data => {
        res.status(200).send('Created Order Successfully', data)
    })
    .catch(err => res.status(400).send("Can't add order",err))
}
module.exports.updateOrders = (req, res) => {
    knex('orders')
    .where({ id: req.params.orders_id })
    .update({...req.body})
    .then(() => {
        res.status(200).send('Order Updated');
    })
    .catch(err => res.status(400).send("Can't Update Order"))
}
module.exports.deleteOrders = (req, res) => {
    knex('orders')
    .where({ id : order_id})
    .del()
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err => res.status(400).send(`Error in deleting ${err}`));
}