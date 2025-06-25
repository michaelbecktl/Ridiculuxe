/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('description')
    table.decimal('price', 10, 2)
    table.string('image')
    table.integer('stock')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('product')
}
