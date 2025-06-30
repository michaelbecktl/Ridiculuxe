import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useCartProducts } from '../hooks/useCart'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { CartData, ProductQuantity } from '../../models/ridiculuxe'
import { useQueries } from '@tanstack/react-query'
import { getProductById } from '../apis/product'
import { useProduct } from '../hooks/useProduct'

interface ProductPurchase {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  stock: number
}

function CheckoutForm() {
  // const {id} = useParams<{id:string}>()
  const navigate = useNavigate()
  const location = useLocation()
  const useProducts = useProduct()

  const purchasedItems: ProductPurchase[] = location.state?.purchasedItems || []
  // const buyerName = location.state?.name || ''

  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [address3, setAddress3] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { cart, products } = useCartProducts()

  const [selectedDetails, setSelectedDetails] = useState('existing')

  let localCartContent: CartData[] = []
  const localCart = localStorage.getItem('cart')
  if (localCart) localCartContent = JSON.parse(localCart) as CartData[]

  const localQuery = useQueries({
    queries: localCartContent.map((product: CartData) => ({
      queryKey: ['cartproduct', product.productId],
      queryFn: () => getProductById(product.productId),
      enabled: !!localCartContent,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })

  if (products.pending || localQuery.pending) return <p>Loading cart...</p>

  const userShippingDetails = {
    user_id: cart.user?.id,
    name: cart.user?.name,
    email: cart.user?.email,
    address1: cart.user?.address1,
    address2: cart.user?.address2,
    address3: cart.user?.address3,
  }
  console.log(cart.data)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedDetails(e.target.value)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    try {
      const postBody =
        selectedDetails === 'existing'
          ? userShippingDetails
          : {
              user_id: cart.user?.id,
              name: name,
              email: email,
              address1: address1,
              address2: address2,
              address3: address3,
            }
      const res = await fetch(`/api/v1/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
      })
      if (!res.ok) throw new Error('Checkout failed')

      const { newOrderId } = res.body
      console.log(newOrderId)

      cart.data.map(async (item: ProductQuantity) =>
        (await useProducts.soldProduct).mutate({
          productId: item.productId,
          quantity: item.quantity,
        }),
      )
      cart.destroy.mutate({ userId: cart.user.id.toString() })

      navigate('/confirmation', {
        state: {
          name,
          email,
          address1,
          address2,
          address3,
          purchasedItems,
        },
      })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  // Guest Users Button Logic //

  async function handleSubmitGuest(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    try {
      const postBody = {
        user_id: null,
        name: name,
        email: email,
        address1: address1,
        address2: address2,
        address3: address3,
      }
      const res = await fetch(`/api/v1/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
      })
      if (!res.ok) throw new Error('Checkout failed')
      localCartContent.map(async (item) =>
        (await useProducts.soldProduct).mutate(item),
      )
      localStorage.removeItem('cart')

      navigate('/confirmation', {
        state: {
          name,
          email,
          address1,
          address2,
          address3,
          purchasedItems,
        },
      })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  const totalUserPrice = products.data.reduce(
    (sum, item, index) => sum + item.price * cart.data[index].quantity,
    0,
  )

  const totalLocalPrice = localQuery.data.reduce(
    (sum, item, index) => sum + item.price * localCartContent[index].quantity,
    0,
  )

  return (
    <div>
      <h1>Review & Pay</h1>
      <h2> Item in your cart</h2>
      <IfAuthenticated>
        <div>
          {products ? (
            products.data?.map((product, index) => (
              <div key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '25%', height: '200px', objectFit: 'cover' }}
                />

                <h2>{product.title}</h2>

                <p>Price: ${product.price}</p>
                <p>Quantity: {cart.data[index].quantity}</p>
              </div>
            ))
          ) : (
            <></>
          )}
          <p>
            Shipping: <span style={{ color: 'green' }}>Free</span>
          </p>
          <p>Total (GST included): ${totalUserPrice.toFixed(2)}</p>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div>
          {localQuery.data.map((product, index) => (
            <div key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '25%', height: '200px', objectFit: 'cover' }}
              />

              <h2>{product.title}</h2>

              <p>Price: ${product.price}</p>
              <p>Quantity: {localCartContent[index].quantity}</p>
            </div>
          ))}
          <p>
            Shipping: <span style={{ color: 'green' }}>Free</span>
          </p>
          <p>Total (GST included): ${totalLocalPrice.toFixed(2)}</p>
        </div>
      </IfNotAuthenticated>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Order placed successfully!</p>}

      <h2>Shipping Address</h2>
      <IfAuthenticated>
        <fieldset>
          <legend>Select a shipping address:</legend>
          <input
            type="radio"
            id="userSaved"
            name="userSelectedAddress"
            value="existing"
            checked={selectedDetails === 'existing'}
            onChange={handleChange}
          />
          <label htmlFor="userSaved"> Saved Details</label>
          <p>{userShippingDetails.name}</p>
          <p>{userShippingDetails.address1}</p>
          <p>{userShippingDetails.address2}</p>
          <p>{userShippingDetails.address3}</p>
          <input
            type="radio"
            id="newDetails"
            name="userSelectedAddress"
            value="new"
            checked={selectedDetails === 'new'}
            onChange={handleChange}
          />
          <label htmlFor="newDetails"> New Address</label>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Full Name</label>
              <br />
              <input
                id="fullname"
                type="text"
                required={selectedDetails === 'new'}
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
                required={selectedDetails === 'new'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address1">Address Line 1</label>
              <br />
              <input
                id="address1"
                type="text"
                required={selectedDetails === 'new'}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address2">Address Line 2</label>
              <br />
              <input
                id="address2"
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address3">Address Line 3</label>
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
        </fieldset>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <h2>Ship to </h2>
        <form onSubmit={handleSubmitGuest}>
          <div>
            <label htmlFor="fullname">Full Name</label>
            <br />
            <input
              id="fullname"
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
            <label htmlFor="address1">Address Line 1</label>
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
            <label htmlFor="address2">Address Line 2</label>
            <br />
            <input
              id="address2"
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address3">Address Line 3</label>
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
      </IfNotAuthenticated>
    </div>
  )
}
export default CheckoutForm
