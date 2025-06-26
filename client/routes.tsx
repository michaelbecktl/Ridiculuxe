import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/App.tsx'
import Registration from './pages/Registration.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<App />} />
    <Route path="/register" element={<Registration />} />
  </Route>,
)
