import { Link } from 'react-router-dom'
import { useAllProducts } from '../hooks/useProduct'
import Footer from './Footer'

export default function Homepage() {
  const { data: products, isPending, isError } = useAllProducts()

  if (isPending) return <>Loading...</>
  if (isError) return <p>An error has occured</p>

  return (
    <div>
      <img
        src="/image/futuristic-image.jpg"
        alt="main homepage futuristic"
        className="h-dvh w-dvw"
      />
      {products.map((e) => (
        <div key={e.id} className="homepageProduct">
          <img src={e.image} alt={e.name} style={{ height: '30%' }} />
          <Link to={`/shop/${e.name}`}>
            <p>{e.name}</p>
          </Link>
          <p>{e.price}</p>
        </div>
      ))}
      <Footer />
    </div>
  )
}
