import LoginButton from './LoginButton.tsx'
import Registration from '../pages/Registration.tsx'

function App() {
  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <LoginButton />
        <Registration />
      </div>
    </>
  )
}

export default App
