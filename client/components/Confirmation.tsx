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

  // const purchasedItems: Product[] = location.state?.purchasedItems || []
  const purchasedItems = JSON.parse(localStorage.getItem('tempOrder'))
  console.log(purchasedItems)
  const totalPrice = purchasedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1 className="confirmation-header">Ridiculuxe Order Confirmation!</h1>
        <p className="greeting">
          Hey, <span>{name} </span>
        </p>
        <h2 className="thank-you">Thank you for shopping with us.</h2>
        <p className="message">
          We have received your order. You’ll receive a notification once it has
          been dispatched.
        </p>

        <div className="items-section">
          <h3>Items Ordered</h3>
          <ul>
            {purchasedItems.map((item) => (
              <li key={item.id} className="item">
                <h4>{item.title}</h4>
                <p>Quantity: x {item.quantity}</p>
                <p>Price: NZ${item.price}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="total-section">
          <p className="shipping-info">
            Shipping: <span className="free">Free</span>
          </p>
          <h3>Order Total (GST included): NZ${totalPrice.toFixed(2)}</h3>
        </div>

        <div className="shipping-section">
          <h3>Shipping Details</h3>
          <div className="address-box">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Address:</strong> {address1}
            </p>
            <p>
              {address2} {address3}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
