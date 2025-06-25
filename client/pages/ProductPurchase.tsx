const productData = {
  id: 1,
  name: 'LuxTech Jacket',
  description: 'The ultimate jacket for all your needs',
  price: 399.9,
  image:
    'https://api.time.com/wp-content/uploads/2015/03/screen-shot-2015-03-12-at-12-01-22-pm.png?w=1080&quality=85',
  stock: 99,
}

function ProductPurchase() {
  return (
    <>
      <div>
        <img src={productData.image} alt={productData.name} />
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
        <p>{productData.price}</p>
        {productData.stock !== 0 ? (
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
      <input id="quantity" type="number" />
      <button>Buy Now</button>
      <button>Add To Cart</button>
    </>
  )
}

export default ProductPurchase
