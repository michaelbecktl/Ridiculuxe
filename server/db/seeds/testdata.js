/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('cart').del()
  await knex('product_order').del()
  await knex('order').del()
  await knex('product').del()
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

  await knex('product').insert([
    {
      id: 1,
      name: 'LuxTech Watch',
      description: 'The ultimate watch for all your needs',
      price: 1799,
      image: '/image/luxtechwatch43.png',
      stock: 99,
    },
    {
      id: 2,
      name: 'ericproduct',
      description: 'The ultimate nano robot for all your needs',
      price: 299.9,
      image: '/image/Nano-Robot.png',
      stock: 99,
    },
    {
      id: 3,
      name: 'BluviaBot',
      description: 'Your Luxe Everyday Assistant',
      price: 29999.99,
      image: '/image/BotBluvia.png',
      stock: 99,
    },
    {
      id: 4,
      name: 'davidproduct',
      description: 'The ultimate glasses for all your needs',
      price: 9999.9,
      image: '/image/Glasses.png',
      stock: 99,
    },
  ])

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
