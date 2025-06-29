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
    {
      id: 2,
      name: 'LuxTech Cape',
      description: 'The ultimate cape for all your needs',
      price: 299.9,
      image:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7RdagAi57Xfj6w4iYQnwEe9UWkki5lHV8ywXbVwvEL4-HRG0zC76KLVrWQvpqwfk7RL2XvSP9BvYFX9PDTlh1LthsNbcaMOU-BvRDg8W6Kewery9n1i9LMl7_2m6x7ll0AcGOV40K&usqp=CAc',
      stock: 99,
    },
    {
      id: 3,
      name: 'LuxTech Cap',
      description: 'The ultimate cap for all your needs',
      price: 9999.9,
      image: '/image/LuxTech-Cap.png',
      stock: 99,
    },
    {
      id: 4,
      name: 'LuxTech Shoe',
      description: 'The ultimate shoe for all your needs',
      price: 9999.9,
      image: '/image/LuxTech-Shoe.png',
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
