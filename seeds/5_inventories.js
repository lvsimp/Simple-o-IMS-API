/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventories').del()
  await knex('inventories').insert([
    {
      'id':'3f775d94-91e5-483a-b9f1-842ab31fb053',
      'name':'Hammer',
      'description':'used for carpentry',
      'price':30,
      'quantity':1500,
      'category_id':'c05c78c1-38e9-40b9-8547-eac6e5ec0835',
      'supplier_id':'8ddf6cb5-e91b-4177-8ad7-351c188d43dc',
      'warehouse_id':'69f4fb51-ba71-41e7-9162-efea42ea4c59',
      "images":"inventories/default_inventory.jpg",
      'created_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-16 11:33:47'),
      'updated_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-17 01:33:47')
    },
    {
      'id':'8b0cea6d-a484-41cc-9360-e398524bf85a',
      'name':'Knives',
      'description':'for cutting, used in the kitchen to cut meat, fruits and vegetable',
      'price':15,
      'quantity':1500,
      'category_id':'75c31813-c7f7-4647-88bf-38561d1749e7',
      'supplier_id':'31841e73-fab2-46c5-99af-dabf531f2d16',
      'warehouse_id':'69f4fb51-ba71-41e7-9162-efea42ea4c59',
      "images":"inventories/default_inventory.jpg",
      'created_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-17 05:05:57'),
      'updated_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-17 15:05:57')
    }
  ]);
};
