/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('suppliers').del()
  await knex('suppliers').insert([
    {
      "id": "d994f966-22d6-4827-b46c-a04636018e4e",
      "name": "This is Sup",
      "address": "Vancouver",
      "phone": "1 234 567 8911",
      "email": "supplier@mail.com",
      "contact_person": "Louisierro Augusto",
      "created_by": "0de9487c-54b8-463d-9585-5692e156d09e",
      "created_on": new Date("2022-12-13 07:14:38"),
      "updated_by": "0de9487c-54b8-463d-9585-5692e156d09e",
      "updated_on": new Date("2022-12-13 07:14:38")
  },
  { 
    "id": "8ddf6cb5-e91b-4177-8ad7-351c188d43dc",
    "name": "test",
    "address": "Surrey",
    "phone": "1235325235",
    "email": "test@mail.com",
    "contact_person": "Henry Chu",
    "created_by": "0de9487c-54b8-463d-9585-5692e156d09e",
    "created_on": new Date("2022-12-17 03:19:32"),
    "updated_by": "0de9487c-54b8-463d-9585-5692e156d09e",
    "updated_on": new Date("2022-12-17 03:19:32")
  },
  {
    "id": "31841e73-fab2-46c5-99af-dabf531f2d16",
    "name": "The ssss",
    "address": "North Vancouver",
    "phone": "1234567890",
    "email": "thesss@mail.com",
    "contact_person": "Annabelle Samson",
    "created_by": "0de9487c-54b8-463d-9585-5692e156d09e",
    "created_on": new Date("2022-12-13 17:26:34"),
    "updated_by": "0de9487c-54b8-463d-9585-5692e156d09e",
    "updated_on": new Date("2022-12-13 17:26:34")
  }


  ]);
};
