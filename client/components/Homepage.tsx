import { Link } from 'react-router-dom'
import { useAllProducts } from '../hooks/useProduct'
import { motion, useAnimation, useInView } from 'framer-motion'
import Footer from './Footer'
import { useEffect, useRef } from 'react'

export default function Homepage() {
  const { data: products, isPending, isError } = useAllProducts()
  const ref1 = useRef(null)
  const isInView1 = useInView(ref1, { once: true })

  const ref2 = useRef(null)
  const isInView2 = useInView(ref2, { once: true })

  const ref3 = useRef(null)
  const isInView3 = useInView(ref3, { once: true })

  const ref4 = useRef(null)
  const isInView4 = useInView(ref4, { once: true })

  const mainControls = useAnimation()

  useEffect(() => {
    mainControls.start('visible')
    console.log(isInView1)
  }, [isInView1, mainControls])

  useEffect(() => {
    mainControls.start('visible')
    console.log(isInView2)
  }, [isInView2, mainControls])

  useEffect(() => {
    mainControls.start('visible')
    console.log(isInView3)
  }, [isInView3, mainControls])

  useEffect(() => {
    mainControls.start('visible')
    console.log(isInView4)
  }, [isInView4, mainControls])

  if (isPending) return <>Loading...</>
  if (isError) return <p>An error has occured</p>

  return (
    <div>
      <motion.img
        src="/image/futuristic-image.jpg"
        alt="main homepage futuristic"
        className="h-dvh w-dvw"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.25 }}
      />
      {products.map((e, i) => {
        let ref = null
        let isInView = null
        if (i === 0) {
          ref = ref1
          isInView = isInView1
        } else if (i === 1) {
          ref = ref2
          isInView = isInView2
        } else if (i === 2) {
          ref = ref3
          isInView = isInView3
        } else if (i === 3) {
          ref = ref4
          isInView = isInView4
        }
        return (
          <div
            key={e.id}
            ref={ref}
            className="homepageProduct"
            id={`product-${i}`}
          >
            <motion.img
              src={e.image}
              alt={e.name}
              style={{ height: '50%' }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <Link to={`/product/${e.name}`}>
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
                {e.name}
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
              {e.price}
            </motion.p>
          </div>
        )
      })}
    </div>
  )
}
