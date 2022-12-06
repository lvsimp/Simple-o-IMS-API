/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventories', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.decimal('price', 8, 2).notNullable();
    table.integer('quantity').notNullable();
    table.uuid('category_id')
         .references('categories.id')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.uuid('supplier_id')
         .references('suppliers.id')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
    table.uuid('warehouse_id')
         .references('warehouses.id')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
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
  return knex.schema.dropTable('inventories');
};
