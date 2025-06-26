import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { Product } from '../../models/ridiculuxe'

function ProductPurchase() {
  const params = useParams()
  const name = params.name as string

  const product = useProduct(name)
  const cart = useCart('1') // NOT COMPLETE, USING HARD-CODED USER //

  const [quantity, setQuantity] = useState('1')

  if (product.isPending || cart.isPending) return <>Loading</>
  if (product.isError || cart.isError) return <p>An error has occured</p>

  const productData = product.data as Product
  const isOOS = productData.stock < 1

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(event.target.value)
    if (Number(event.target.value) < 0) setQuantity('0')
    if (Number(event.target.value) > productData.stock)
      setQuantity(productData.stock.toString())
  }

  async function handleAdd() {
    const addProduct = {
      userId: '1',
      productId: productData.id.toString(),
      quantity: Number(quantity),
    }
    cart.addToCart.mutate(addProduct)
  }

  async function handleBuy() {
    const addProduct = {
      userId: '1',
      productId: productData.id.toString(),
      quantity: Number(quantity),
    }
    cart.buyNow.mutate(addProduct)
  }

  return (
    <>
      <div>
        <img src={productData.image} alt={productData.name} />
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
        <p>{productData.price}</p>
        {productData.stock < 1 ? (
          <p>Out of stock</p>
        ) : productData.stock > 10 ? (
          <p>Available</p>
        ) : productData.stock > 1 ? (
          <p>{productData.stock} units left</p>
        ) : (
          <p>1 unit left</p>
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
