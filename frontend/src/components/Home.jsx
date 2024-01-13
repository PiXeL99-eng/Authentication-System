import React from 'react'
import { Container, Stack, Heading, Button, Avatar} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    console.log("check")
  }

  return (

    <>
      <Container maxW="100vw" height="100vh" bg='#14151e'>
        <Container maxW="2xl" centerContent height={"100vh"}>
          <Stack spacing={4} direction='column' my={"auto"} minWidth={"50%"}>

            <Stack direction='column' color="#fffffc" spacing={4}>

              {/* <Avatar bg='#0bc5ea' icon={<AiOutlineUser fontSize='1.5rem' />} /> */}
              <Avatar bg='#0bc5ea' mx={"auto"}/>
              <Heading as='h1' size='xl' textAlign={"center"}>
                Hi Sayan
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