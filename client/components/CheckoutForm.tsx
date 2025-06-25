import React, {useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

interface Product{ 
  id:number; 
  title:string; 
  price:number; 
  image:string; 
  stock:number}

function CheckoutForm(){
  const {id} = useParams<{id:string}>()
  const navigate = useNavigate()
  const [product,setProduct] = useState<Product|null>(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  const [address3,setAddress3] = useState('')
  const [submitting,setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchProduct(){
      try{
        const res = await fetch(`/api/v1/products/${id}`)
        if(!res.ok) throw new Error('Failed to load product')
        const data = await res.json()
        setProduct(data)
      }catch(err){
        setError((err as Error).message)
      }finally{
        setLoading(false)
      }
    }
    fetchProduct()
  },[id])

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    setSubmitting(true)
    try{
      const res = await fetch('/api/v1/checkout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          product_id: product?.id,
          name,
          email,
          address1,
          address2,
          address3
        })
      })
      if(!res.ok) throw new Error('Checkout failed')
      navigate('/confirmation',{state:{productTitle: product?.title}})
    }catch(err){
      setError((err as Error).message)
    }finally{
      setSubmitting(false)
    }
  }

  if(loading) return <p>Loading product...</p>
  if(error) return <p style={{color:'red'}}>Error: {error}</p>

  return (
    <div>
      <h1>Checkout</h1>
      {product && <>
        <img src={product.image} alt={product.title} style={{width:'100%',height:'300px',objectFit:'cover'}}/>
        <h2>{product.title}</h2>
        <p>Price: ${product.price.toLocaleString()}</p>
        <p>
  {product.stock > 5
    ? `In Stock: ${product.stock}`
    : product.stock > 0
    ? `Low Stock: ${product.stock}`
    : 'Sold Out'}
</p>
      </>}
      <form onSubmit={handleSubmit}>
        <div><label htmlFor="name">Name:</label><br/>
          <input id="name" type="text" required value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div><label htmlFor="email">Email:</label><br/>
          <input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div><label htmlFor="address1">Address 1:</label><br/>
          <input id="address1" type="text" required value={address1} onChange={e=>setAddress1(e.target.value)} />
        </div>
        <div><label htmlFor="address2">Address 2 (optional):</label><br/>
          <input id="address2" type="text" value={address2} onChange={e=>setAddress2(e.target.value)} />
        </div>
        <div><label htmlFor="address3">Address 3 (optional):</label><br/>
          <input id="address3" type="text" value={address3} onChange={e=>setAddress3(e.target.value)} />
        </div>
        <div>
          <button type="submit" disabled={submitting}>{submitting?'Placing Order...':'Place Order'}</button>
        </div>
      </form>
    </div>
  )
}
export default CheckoutForm