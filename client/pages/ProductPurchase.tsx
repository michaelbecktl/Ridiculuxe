import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartData, Product } from '../../models/ridiculuxe'
import { useUser } from '../hooks/useUser'

function ProductPurchase() {
  const params = useParams()
  const name = params.name as string
  const product = useProduct(name)
  const navigate = useNavigate()

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
      navigate('/checkout')
    }
    cart.buyNow.mutate(addProduct)
  }

  return (
    <>
      <div className="flex h-[84vh] bg-[var(--order-bg)]">
        <div className="my-16 ml-32">
          <Link to={`/product/${productData.name}`}>
            <h1 className="my-4 text-6xl decoration-from-font hover:underline">
              {productData.name}
            </h1>
          </Link>
          <span className="mr-4">{productData.description}</span>
          <Link to={`/product/${productData.name}`}>
            <span className="mr-2 decoration-from-font hover:underline">
              Learn More
            </span>
            <span>&gt;</span>
          </Link>
          <div className="grid grid-cols-2">
            <div className="flex h-[384px] w-[512px] justify-center rounded-xl border-2 border-solid border-current">
              <img
                src={productData.image}
                alt={productData.name}
                className="aspect-3/2 max-h-[383px] max-w-[511px] overflow-hidden "
              />
            </div>
            <div className="mx-16 my-8 rounded-3xl bg-[var(--card-bg)] shadow-[inset_0_2px_6px_rgba(66,66,66,0.05)]">
              <p className="ml-16 mt-16 text-4xl">NZD {productData.price}</p>
              {productData.stock < 1 ? (
                <p className="ml-16 text-[#424242]">Out Of Stock</p>
              ) : productData.stock > 10 ? (
                <p className="ml-16 text-[#424242]">In Stock</p>
              ) : productData.stock > 1 ? (
                <p className="ml-16 text-[#424242]">
                  {productData.stock} Units Left
                </p>
              ) : (
                <p className="ml-16 text-[#424242]" style={{ color: 'red' }}>
                  1 Unit Left
                </p>
              )}
              <br />
              <label htmlFor="quantity" className="ml-16 text-xs">
                Quantity
              </label>
              <br />
              <input
                id="quantity"
                type="number"
                value={isOOS ? '' : quantity}
                onChange={handleChange}
                disabled={isOOS}
                className="ml-16 w-24 rounded-md border-2 border-solid border-[black] bg-[var(--text-field)] p-2 text-[black]"
              />
              <br />
              <button
                disabled={isOOS}
                onClick={handleBuy}
                className="my-4 ml-16 rounded-xl bg-[#424242] px-4 py-2 text-[white] hover:opacity-80 active:opacity-100"
              >
                Buy Now
              </button>
              <button
                disabled={isOOS}
                onClick={handleAdd}
                className="mx-2 my-4 rounded-xl bg-[#424242] px-4 py-2 text-[white] hover:opacity-80 active:opacity-100"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPurchase
