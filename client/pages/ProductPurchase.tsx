import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartData, Product } from '../../models/ridiculuxe'
import { useUser } from '../hooks/useUser'

import { useNavigate } from 'react-router-dom'

interface ProductPurchase {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  stock: number
}

function ProductPurchase() {
  const params = useParams()
  const name = params.name as string
  const product = useProduct(name)

  const [quantity, setQuantity] = useState('1')

  const user = useUser()
  const userId = user.data?.id.toString()
  const cart = useCart(userId)

  const navigate = useNavigate()

  if (product.isPending) return <></>
  if (product.isError) return <p>An error has occured</p>

  const productData = product.data as Product
  const isOOS = productData.stock < 1

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(event.target.value)
    if (Number(event.target.value) < 0) setQuantity('0')
    if (Number(event.target.value) > productData.stock)
      setQuantity(productData.stock.toString())
  }

  // Logic for Non-Registered Users //
  let temporaryCart: CartData[] = []
  const localCart = localStorage.getItem('cart')
  console.log(localCart)
  if (localCart) temporaryCart = JSON.parse(localCart) as CartData[]

  async function handleAdd() {
    const addProduct = {
      userId: userId,
      productId: productData.id.toString(),
      quantity: Number(quantity),
    }
    if (!userId) {
      const existsLocally = temporaryCart.find(
        (item) => item.productId === addProduct.productId,
      )
      existsLocally
        ? temporaryCart.map((item) => {
            if (item.productId === addProduct.productId)
              item.quantity += addProduct.quantity
          })
        : temporaryCart.push(addProduct)
      localStorage.setItem('cart', JSON.stringify(temporaryCart))
    }
    if (userId) cart.addToCart.mutate(addProduct)
  }

  async function handleBuy() {
    const addProduct = {
      userId: userId,
      productId: productData.id.toString(),
      quantity: Number(quantity),
    }
    if (userId) {
    cart.buyNow.mutate(addProduct)
  }

  navigate('/checkout', {
    state: {
      name: productData.name,
      purchasedItems: [
        {
          id: productData.id,
          title: productData.name,
          quantity: Number(quantity),
          price: productData.price,
          image: productData.image,
        
        },
      ],
    },
  })
}

  return (
    <>
      <div>
        <img src={productData.image} alt={productData.name} />
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
        <p>NZD {productData.price}</p>
        {productData.stock < 1 ? (
          <p>Out Of Stock</p>
        ) : productData.stock > 10 ? (
          <p>In Stock</p>
        ) : productData.stock > 1 ? (
          <p>{productData.stock} Units Left</p>
        ) : (
          <p style={{ color: 'red' }}>1 Unit Left</p>
        )}
      </div>
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        type="number"
        value={isOOS ? '' : quantity}
        onChange={handleChange}
        disabled={isOOS}
      />
      <button disabled={isOOS} onClick={handleBuy}>
        Buy Now
      </button>
      <button disabled={isOOS} onClick={handleAdd}>
        Add To Cart
      </button>
    </>
  )
}

export default ProductPurchase
