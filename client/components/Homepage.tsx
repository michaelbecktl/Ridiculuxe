import { motion } from 'framer-motion'
import { useAllProducts } from '../hooks/useProduct'
import ProductCard from './ProductCard'

export default function Homepage() {
  const { data: products, isPending, isError } = useAllProducts()

  if (isPending) return <>Loading...</>
  if (isError) return <p>An error has occured</p>

  return (
    <>
      <motion.img
        src="/image/futuristic-image.jpg"
        alt="main homepage futuristic"
        className="h-dvh w-dvw"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.25 }}
      />
      {products.map((product, index) => {
        return <ProductCard data={product} key={`Product ${index + 1}`} />
      })}
    </>
  )
}
