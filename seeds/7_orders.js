/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('orders').del()
  await knex('orders').insert([
    {
      'id': '22ae1144-280c-4929-ba4f-24e6853eba65',
      'transaction_id': '7e1ec96e-09f8-4d21-870a-03fe75a81188',
      'item_id': '3f775d94-91e5-483a-b9f1-842ab31fb053',
      'quantity': 2,
      'subtotal': 60.00
    }
  ]);
};
