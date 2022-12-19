/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {
      'id':'75c31813-c7f7-4647-88bf-38561d1749e7',
      'type': 'Housewares',
      'created_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-15 22:46:17'),
      'updated_by': '0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-16 22:46:17')
    } ,
    {
      'id':'c05c78c1-38e9-40b9-8547-eac6e5ec0835',
      'type':'Handtools',
      'created_by':'0de9487c-54b8-463d-9585-5692e156d09e',
      'created_on': new Date('2022-12-17 02:53:55'),
      'updated_by':'0de9487c-54b8-463d-9585-5692e156d09e',
      'updated_on': new Date('2022-12-18 02:53:55')
    }
  ]);
};
