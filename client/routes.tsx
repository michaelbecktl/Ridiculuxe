import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Homepage from './components/Homepage.tsx'
import ProductPurchase from './pages/ProductPurchase.tsx'
import CheckoutForm from './components/CheckoutForm.tsx'
import Registration from './pages/Registration.tsx'
import Profile from './pages/Profile.tsx'
import ContactUs from './pages/ContactUs.tsx'
import Confirmation from './components/Confirmation.tsx'
import AboutUs from './pages/AboutUs.tsx'
import HFTWatch from './pages/HFTWatch.tsx'
import EricProduct from './pages/EricProduct.tsx'
import LuxeVision from './pages/LuxeVision.tsx'
import BluviaBot from './pages/BluviaBot.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="checkout" element={<CheckoutForm />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/shop/:name" element={<ProductPurchase />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/product/LuxTech Watch" element={<HFTWatch />} />
    <Route path="/product/LuxeVision" element={<LuxeVision />} />
    <Route path="/product/Nanobot" element={<EricProduct />} />
    <Route path="/product/BluviaBot" element={<BluviaBot />} />
  </Route>,
)
