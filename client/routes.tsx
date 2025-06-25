import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import CheckoutForm from './components/CheckoutForm.tsx'

export default createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="checkout/:id" element={<CheckoutForm />} />
    
  </>,
)
