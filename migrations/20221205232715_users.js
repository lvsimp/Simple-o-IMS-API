/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users' , (table) =>{
        table.uuid('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.uuid('created_by')
             .references('users.id')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.uuid('updated_by')
             .references('users.id')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
        table.timestamp('updated_on').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
