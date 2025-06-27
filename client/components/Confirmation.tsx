
import { useLocation} from 'react-router-dom'

function Confirmation() {
  const location = useLocation()
  // const productTitle = location.state?.productTitle || 'your item'
  // const name = location.state?.customerName || 'Customer'

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1> Thank you for your purchase!</h1>
      <p>
        We're getting your order ready to be shipped. We will notifiy you when
        it has been sent.</p>
      
    </div>
  )
}

export default Confirmation