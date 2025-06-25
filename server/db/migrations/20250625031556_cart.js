/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('cart', (table) => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.integer('product_id').references('product.id').notNullable()
    table.integer('quantity')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('cart')
}
