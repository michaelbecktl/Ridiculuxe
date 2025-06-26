import { FetchPrice, Product } from '../../models/ridiculuxe'
import { useProduct } from '../hooks/useProduct'

interface Props {
  productId: string
  fetchPrice: FetchPrice
}

function CartProductElement(props: Props) {
  const product = useProduct(props.productId)

  if (product.isLoading) return <p>Loading</p>
  if (product.isError) return <p>An error has occured</p>

  const productData = product.data as Product
  props.fetchPrice(productData.price)

  return (
    <>
      <div>
        <img src={productData.image} alt={productData.name} />
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
      </div>
    </>
  )
}

export default CartProductElement
