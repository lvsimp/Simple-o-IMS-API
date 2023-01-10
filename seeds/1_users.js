/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      "id": "0de9487c-54b8-463d-9585-5692e156d09e",
      "first_name": "Louise",
      "last_name": "Simpelo",
      "email": "lvs@gmail.com",
      "password": bcrypt.hashSync('test1234', 10),
      "role": "Admin",
      "image":"user/default_user.svg",
      "created_by": null,
      "created_on": new Date('2022-12-07 05:06:55'),
      "updated_by": null,
      "updated_on":  new Date('2022-12-07 05:06:55')
    },
    {
      "id": "f9271b58-77e0-4c6a-be99-6e868831c425",
      "first_name": "Vien",
      "last_name": "simpelo",
      "email": "viens@gmail.com",
      "password":  bcrypt.hashSync('test', 10),
      "role": "Cashier",
      "image":"user/default_user.svg",
      "created_by": '0de9487c-54b8-463d-9585-5692e156d09e',
      "created_on": new Date('2022-12-14 22:03:50'),
      "updated_by": '0de9487c-54b8-463d-9585-5692e156d09e',
      "updated_on":  new Date('2022-12-14 22:03:50')
    }
  ]);
};
