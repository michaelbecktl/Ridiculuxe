import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartData, Product } from '../../models/ridiculuxe'
import { useUser } from '../hooks/useUser'

function ProductPurchase() {
  const params = useParams()
  const name = params.name as string
  const product = useProduct(name)

  const [quantity, setQuantity] = useState('1')

  const user = useUser()
  const userId = user.data?.id.toString()
  const cart = useCart(userId)

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
    cart.buyNow.mutate(addProduct)
  }

  return (
    <>
      <div className="mx-32 my-16 flex">
        <div>
          <Link to={`${productData.name}`}>
            <h1 className="my-4 text-6xl decoration-from-font hover:underline">
              {productData.name}
            </h1>
          </Link>
          <span className="mr-4">{productData.description}</span>
          <Link to={`${productData.name}`}>
            <span className="mr-2 decoration-from-font hover:underline">
              Learn More
            </span>
            <span>&gt;</span>
          </Link>
          <img
            src={productData.image}
            alt={productData.name}
            className="my-4 max-w-xl"
          />
        </div>
        <div className="m-16">
          <p className="text-4xl">NZD {productData.price}</p>
          {productData.stock < 1 ? (
            <p>Out Of Stock</p>
          ) : productData.stock > 10 ? (
            <p>In Stock</p>
          ) : productData.stock > 1 ? (
            <p>{productData.stock} Units Left</p>
          ) : (
            <p style={{ color: 'red' }}>1 Unit Left</p>
          )}
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
        </div>
      </div>
    </>
  )
}

export default ProductPurchase
