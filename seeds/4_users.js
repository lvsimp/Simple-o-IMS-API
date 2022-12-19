/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      "id": "0de9487c-54b8-463d-9585-5692e156d09e",
      "first_name": "Louise",
      "last_name": "Simpelo",
      "email": "lvs@gmail.com",
      "username": "b_heart",
      "password": "$2b$10$rA9fJpiHMd6ZtjGQoQk/D.G.InT8LPeet1OTaMVribAhF17UA0fC6",
      "role": "Admin",
      "created_by": null,
      "created_on": new Date('2022-12-07 05:06:55'),
      "updated_by": null,
      "updated_on":  new Date('2022-12-07 05:06:55')
    },
    {
      "id": "f9271b58-77e0-4c6a-be99-6e868831c425",
      "first_name": "louise",
      "last_name": "simpelo",
      "email": "louiseviviensimpelo08@gmail.com",
      "username": "bheart",
      "password": "$2b$10$vLMrdpFVU.hzFJ.N18Px.uY12BoTiQKJTFgrzVEF50TdcCz.65MGu",
      "role": "Cashier",
      "created_by": '0de9487c-54b8-463d-9585-5692e156d09e',
      "created_on": new Date('2022-12-14 22:03:50'),
      "updated_by": '0de9487c-54b8-463d-9585-5692e156d09e',
      "updated_on":  new Date('2022-12-14 22:03:50')
    }
  ]);
};
