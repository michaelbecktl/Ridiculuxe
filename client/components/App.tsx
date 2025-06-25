import { useFruits } from '../hooks/useFruits.ts'

import CheckoutForm from './CheckoutForm.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
        
        {/* testing  */}
        <h2 className="text-xl font-semibold mt-4">Checkout Form</h2>

        <CheckoutForm />
        {/* testing  */}
      </div>
    </>
  )
}

export default App
