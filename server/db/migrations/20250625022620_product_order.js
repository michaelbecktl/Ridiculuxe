/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('product_order', (table) => {
    table.integer('product_id').references('product.id').notNullable()
    table.integer('order_id').references('order.id').notNullable()
    table.integer('quantity').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('product_order')
}
