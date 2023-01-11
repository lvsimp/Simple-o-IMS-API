/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transaction', (table) => {
        table.uuid('id').primary();
        table.timestamp('trans_date').defaultTo(knex.fn.now());
        table.string('customer_name').notNullable();
        table.string('customer_address').notNullable()
        table.decimal('total_cost', 8, 2);
        table.uuid('created_by')
             .references('users.id')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
        table.timestamp('created_on').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transaction');
};
