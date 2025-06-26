/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('user').del()
  await knex('user').insert([
    {
      id: 1,
      name: 'testUser',
      email: 'testuser@gmail.com',
      auth0_id: 'test|12345667890',
      address1: '123 Database Ave',
      address2: '9999 World Wide Web',
      address3: '',
    },
  ])

  await knex('product').del()
  await knex('product').insert([
    {
      id: 1,
      name: 'LuxTech Glasses',
      description: 'The ultimate glasses for all your needs',
      price: 399.9,
      image:
        'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
      stock: 99,
    },
  ])

  await knex('order').del()
  await knex('order').insert([
    {
      id: 1,
      user_id: 1,
      name: 'testUser',
      email: 'testuser@gmail.com',
      address1: '123 Database Ave',
      address2: '9999 World Wide Web',
      address3: '',
    },
  ])
}
