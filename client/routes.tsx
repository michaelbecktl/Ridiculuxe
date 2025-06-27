import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Homepage from './components/Homepage.tsx'
import ProductPurchase from './pages/ProductPurchase.tsx'
import CheckoutForm from './components/CheckoutForm.tsx'
import Registration from './pages/Registration.tsx'
import Confirmation from './components/Confirmation.tsx'
import AboutUs from './pages/AboutUs.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="checkout" element={<CheckoutForm />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/shop/:name" element={<ProductPurchase />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/aboutus" element={<AboutUs />} />
  </Route>,
)
