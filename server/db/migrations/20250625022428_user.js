/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('auth0_id').notNullable()
    table.string('address1')
    table.string('address2')
    table.string('address3')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('user')
}
