import { useLocation } from 'react-router-dom'
interface Product {
  id: number
  title: string
  price: number
  quantity: number
}

function Confirmation() {
  const location = useLocation()
  const purchasedItems: Product[] = location.state?.purchasedItems || []
// const name = location.state?.name || ''
  const totalPrice = purchasedItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Thank you for your purchase!</h1>
      <p>
        We are getting your order ready to be shipped. We will notify you when
        it has been sent.
      </p>

      <h2 style={{ marginTop: '2rem' }}>Order Summary</h2>
      <p> Thank you for your purchase. {location.state?.name}</p>
      <p>Items purchased</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {purchasedItems.map((item) => (
          <li key={item.id}>
            {item.title || 'No'} Quantity:{item.quantity} = $
            {item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3>Order total(GST included): NZ${totalPrice.toFixed(2)}</h3>
    </div>
  )
}

export default Confirmation