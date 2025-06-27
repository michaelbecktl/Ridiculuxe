import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Homepage from './components/Homepage.tsx'
import ProductPurchase from './pages/ProductPurchase.tsx'
import CheckoutForm from './components/CheckoutForm.tsx'
import Registration from './pages/Registration.tsx'
import ContactUs from './pages/ContactUs.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="checkout" element={<CheckoutForm />} />
    <Route path="/shop/:name" element={<ProductPurchase />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/contact" element={<ContactUs />} />
  </Route>,
)
