import CreateUser from '../components/CreateUser'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Registration() {
  const query = useUser()
  const navigate = useNavigate()

  console.log(query.data)

  useEffect(() => {
    if (query.data) {
      navigate('/')
    }
  }, [query.data, navigate])

  return (
    <>
      <CreateUser />
    </>
  )
}

export default Registration
