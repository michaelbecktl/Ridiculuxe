import { Product } from '../../models/ridiculuxe'
import Footer from './Footer'
import Header from './Header'

export default function Homepage() {
  const exampleData: Product[] = [
    {
      id: 1,
      name: 'LuxTech Jacket1',
      description: 'The ultimate jacket for all your needs',
      price: 399.9,
      image:
        'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
      stock: 99,
    },
    {
      id: 2,
      name: 'LuxTech Jacket2',
      description: 'The ultimate jacket for all your needs',
      price: 399.9,
      image:
        'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
      stock: 99,
    },
    {
      id: 3,
      name: 'LuxTech Jacket3',
      description: 'The ultimate jacket for all your needs',
      price: 399.9,
      image:
        'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
      stock: 99,
    },
    {
      id: 4,
      name: 'LuxTech Jacket4',
      description: 'The ultimate jacket for all your needs',
      price: 399.9,
      image:
        'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
      stock: 99,
    },
  ]

  return (
    <div>
      <Header />
      {exampleData.map((e) => (
        <div key={e.id} className="homepageProduct">
          <p>Name: {e.name}</p>
          <img src={e.image} alt={e.name} />
          <p>Description: {e.description}</p>
          <p>Price: ${e.price}</p>
        </div>
      ))}
      <Footer />
    </div>
  )
}
