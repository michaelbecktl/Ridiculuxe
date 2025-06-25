import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import ProductPurchase from './pages/ProductPurchase.tsx'
import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="shop/:name" element={<ProductPurchase />} />
  </Route>,
)
