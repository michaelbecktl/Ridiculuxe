import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../models/ridiculuxe'

function ProductCard({ data }: { data: Product }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) mainControls.start('visible')
  }, [isInView, mainControls])

  return (
    <div>
      <div
        key={data.id}
        ref={ref}
        className="homepageProduct"
        id={`product-${data.id}`}
      >
        <motion.img
          src={data.image}
          alt={data.name}
          style={{ height: '50%' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <Link to={`/product/${data.name}`}>
          <motion.p
            className="mb-10 text-[48px]"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {data.name}
          </motion.p>
        </Link>
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {data.price}
        </motion.p>
      </div>
    </div>
  )
}

export default ProductCard
