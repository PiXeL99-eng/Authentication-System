import React, {useEffect, useState} from 'react'
import { Container, Stack, Heading, Button, Avatar} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

import { getProfileCall } from '../api_calls/auth_api'
import { useAuth } from '../provider/authProvider'

const Home = () => {

  const { token, setToken } = useAuth()
  const [textDetails, setTextDetails] = useState({});
  
  const getProfileDetails = async () => {

    const {email, name} = await getProfileCall()

    setTextDetails({email, name})

  }

  useEffect(() => {

    getProfileDetails();

  }, [token])

  const navigate = useNavigate()

  const handleClick = () => {

    setToken();
    navigate("/", { replace: true });

  }

  return (

    <>
      <Container maxW="100vw" height="100vh" bg='#14151e'>
        <Container maxW="2xl" centerContent height={"100vh"}>
          <Stack spacing={4} direction='column' my={"auto"} minWidth={"50%"}>

            <Stack direction='column' color="#fffffc" spacing={4}>
              <Avatar bg='#0bc5ea' mx={"auto"}/>
              <Heading as='h2' textAlign={"center"}>
                Hi {textDetails.name}
              </Heading>
              <Heading as='h2' textAlign={"center"}>
                Your Email: {textDetails.email}
              </Heading>

              <Button
                // isLoading
                loadingText='Loading'
                colorScheme='cyan'
                spinnerPlacement='end'
                type="submit"
                width="full"
                color="black"
                marginY="2"
                onClick={handleClick}
              >
                Log out
              </Button>

            </Stack>
          </Stack>
        </Container>
      </Container>
    </>
  )
}

export default Home