import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useState } from 'react'

// const productData = {
//   id: 1,
//   name: 'LuxTech Jacket',
//   description: 'The ultimate jacket for all your needs',
//   price: 399.9,
//   image:
//     'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
//   stock: 11,
// }

function ProductPurchase() {
  const params = useParams()
  const name = params.name as string
  const product = useProduct(name)

  const [quantity, setQuantity] = useState('1')

  if (product.isPending) return <></>
  if (product.isError) return <p>An error has occured</p>

  const productData = product.data
  const isOOS = productData.stock < 1

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(event.target.value)
    if (Number(event.target.value) < 0) setQuantity('0')
    if (Number(event.target.value) > productData.stock)
      setQuantity(productData.stock.toString())
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
      <button disabled={isOOS}>Buy Now</button>
      <button disabled={isOOS}>Add To Cart</button>
    </>
  )
}

export default ProductPurchase
