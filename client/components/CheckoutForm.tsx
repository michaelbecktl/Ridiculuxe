import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import { useCartProducts } from '../hooks/useCart'
import { useUser } from '../hooks/useUser';

interface ProductPurchase {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  stock: number
}

function CheckoutForm(){
  
  // const {id} = useParams<{id:string}>()
  const navigate = useNavigate()
  const location = useLocation()

  const purchasedItems: ProductPurchase[] = location.state?.purchasedItems || []
  console.log('purchasedItems', purchasedItems)
  // const buyerName = location.state?.name || ''

  const [error,setError] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  const [address3,setAddress3] = useState('')
  const [submitting,setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const userId = useUser()
const { cart, products } = useCartProducts('1')


if(products.pending) {
  return <p>Loading...your cart</p>
}
console.log(userId.data?.id)
console.log(cart.data)
console.log(products.data)


// const productsData = products.data as Product[]
//   const product = productsData[0] 

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)
    try{

for (const product of purchasedItems) {
        const res = await fetch(`/api/v1/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: product.id,
            name,
            email,
            address1,
            address2,
            address3,
            
            
          }),
        })
      if(!res.ok) throw new Error('Checkout failed')
      }
      navigate('/confirmation',{
        state:{
          name,
          email,
          address1,
          address2,
          address3,
          purchasedItems,
        },
      })
    }catch(err){
      setError((err as Error).message)
    }finally{
      setSubmitting(false)
    }
  }
  
  const totalPrice = purchasedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0)

    return (
      <div className="checkout-container">
        <h1 className="checkout-title">Review & Pay</h1>
        <h2 className="section-heading">Item in your cart</h2>
    
        {purchasedItems.map((product) => (
          <div key={product.id} className="cart-item">
            <img
              src={product.image}
              alt={product.title}
              className="cart-item-image"
              style={{ width: '25%', height: '200px', objectFit: 'cover' }}
            />
    
            <h2 className="item-title">{product.title}</h2>
            <p className="item-price">Price: ${product.price}</p>
            <p className="item-quantity">Quantity: {product.quantity}</p>
            <p className="shipping-info">
              Shipping: <span className="free">Free</span>
            </p>
            <p className="total-price">
              Total (GST included): NZ$ ${totalPrice.toFixed(2)}
            </p>
          </div>
        ))}
    
        {error && <p className="error-message">Error: {error}</p>}
        {success && <p className="success-message">Order placed successfully!</p>}
    
        <h2 className="section-heading">Ship to</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <br />
            <input
              id="fullname"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address1">Address</label>
            <br />
            <input
              id="address1"
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">City</label>
            <br />
            <input
              id="address2"
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address3">Country</label>
            <br />
            <input
              id="address3"
              type="text"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={submitting}
              className="submit-button"
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    )
  }
    export default CheckoutForm