/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table)=> {
    table.uuid('id').primary();
    table.uuid('transaction_id')
    .references('transaction.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    table.uuid('item_id')
    .references('inventories.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('subtotal', 8, 2).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
