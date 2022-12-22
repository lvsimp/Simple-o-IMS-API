/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('warehouses').del()
  await knex('warehouses').insert([
    {
      'id':'69f4fb51-ba71-41e7-9162-efea42ea4c59',
      'name': 'warehouse1',
      'address': 'burnaby',
      'created_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-15 15:45:38'),
      'updated_by':'0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-15 15:45:38')
    },
    {
      'id': 'd93274c7-d288-458e-8219-442ecffc424d', 
      'name': 'warehouse 2',
      'address': 'vancouver',
      'created_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-14 00:17:02'),
      'updated_by':'0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-14 00:17:02')
    }
  ]);
};
