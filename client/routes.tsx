import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Homepage from './components/Homepage.tsx'
import ProductPurchase from './pages/ProductPurchase.tsx'
import Registration from './pages/Registration.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="/shop/:name" element={<ProductPurchase />} />
    <Route path="/register" element={<Registration />} />
  </Route>,
)
