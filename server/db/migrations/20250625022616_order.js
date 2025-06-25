/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('order', (table) => {
    table.increments('id')
    table.integer('user_id').references('user.id').nullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('address1').notNullable()
    table.string('address2')
    table.string('address3')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('order')
}
