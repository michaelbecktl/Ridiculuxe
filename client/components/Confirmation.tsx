import { useLocation } from 'react-router-dom'

interface Product {
  id: number
  title: string
  price: number
  quantity: number
}

function Confirmation() {
  const location = useLocation()
  const name = location.state?.name || ''
  const address1 = location.state?.address1 || ''
  const address2 = location.state?.address2 || ''
  const address3 = location.state?.address3 || ''

  const purchasedItems: Product[] = location.state?.purchasedItems || []
// const name = location.state?.name || ''
  const totalPrice = purchasedItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Ridiculuxe Order Confirmation!</h1>
      <p> Hey, {location.state?.name}</p>
      <h1>Thank you for shopping with us.</h1>
      <p>
        We have received your order. We will send you a notifications once your
        order has been dispatched.
      </p>

      <h2 style={{ marginTop: '2rem' }}>Items ordered</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {purchasedItems.map((item) => (
          <li key={item.id}>
            {item.title || 'N/A'}
            <p>Quantity: x {item.quantity} </p>
            <p>NZ${item.price}</p>
          </li>
        ))}
      </ul>
      <p>
  Shipping: <span style={{ color: 'green' }}>Free</span>
</p>
      <h2>Order total(GST included): NZ${totalPrice.toFixed(2)}</h2>

      <h2>Shipping Details</h2>
<p>{name}</p>
<p>{address1}</p>
<p>{address2}</p>
<p>{address3}</p>
    </div>
  )
}

export default Confirmation