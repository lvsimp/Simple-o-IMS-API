/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transaction').del()
  await knex('transaction').insert([
    {
      'id': '7e1ec96e-09f8-4d21-870a-03fe75a81188',
      'trans_date': new Date('2023-01-02 11:33:47'),
      'customer_name': 'Lhea',
      'customer_address': 'Vancouver',
      'total_cost': 65.98,
      'created_by': 'f9271b58-77e0-4c6a-be99-6e868831c425',
      "created_on": new Date('2023-01-02 11:33:47'),
    }
  ]);
};
