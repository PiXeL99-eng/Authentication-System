import { useState } from 'react'
import { Home, Signup, Login} from './components';
import { Container } from '@chakra-ui/react'

function App() {

  return (
    <>
      <Container maxW="100vw" height="100vh" bg='#14151e'>
        {/* <Signup /> */}
        <Login />
        {/* <Home /> */}
      </Container>
    </>
  )
}

export default App
