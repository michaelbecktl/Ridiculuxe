import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import { useCartProducts } from '../hooks/useCart'
import { useUser } from '../hooks/useUser';

interface Product{ 
  id:number; 
  title:string; 
  price:number; 
  image:string; 
  stock:number}

function CheckoutForm(){
  
  // const {id} = useParams<{id:string}>()
  const navigate = useNavigate()

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


const productsData = products.data as Product[]
  const product = productsData[0] 

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)
    try{


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
      navigate('/confirmation',{
    state:{
      name,
      productTitle: product.title,
      purchasedItems: productsData.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: cart.data?.find((cart: { productId: string; }) => cart.productId === product.id.toString())?.quantity || 1,
        price: product.price,
      }))
    }})
    }catch(err){
      setError((err as Error).message)
    }finally{
      setSubmitting(false)
    }
  }

  if(error) return <p style={{color:'red'}}>Error: {error}</p>
  

  return (
    <div>
      <h1>Checkout</h1>
      <h2> Item in your cart</h2>

      {productsData.map((product) => (
        <div key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '25%', height: '200px', objectFit: 'cover' }}
          />
          <h2>Product Name{product.title}</h2>
          <p>Price: ${product.price.toLocaleString()}</p>
          <p>Quantity</p>
          Shipping: FREE
          <p>Order total(GST included): NZ$</p>
          {/* <p>
      {product.stock > 5
        ? `In Stock: ${product.stock}`
        : product.stock > 0
        ? `Low Stock: ${product.stock}`
        : 'Sold Out'}
    </p> */}
        </div>
      ))}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Order placed successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address1">Address </label>
          <br />
          <input
            id="address1"
            type="text"
            required
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address2">City</label>
          <br />
          <input
            id="address2"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address3">Country</label>
          <br />
          <input
            id="address3"
            type="text"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CheckoutForm