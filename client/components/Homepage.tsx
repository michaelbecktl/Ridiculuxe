import { useAllProducts } from '../hooks/useProduct'
import Footer from './Footer'
import Header from './Header'

export default function Homepage() {
  const { data: products, isPending, isError } = useAllProducts()

  if (isPending) return <>Loading...</>
  if (isError) return <p>An error has occured</p>

  return (
    <div>
      <Header />
      {products.map((e) => (
        <div key={e.id} className="homepageProduct">
          <p>Name: {e.name}</p>
          <img src={e.image} alt={e.name} style={{ height: '30%' }} />
          <p>Description: {e.description}</p>
          <p>Price: ${e.price}</p>
        </div>
      ))}
      <Footer />
    </div>
  )
}
