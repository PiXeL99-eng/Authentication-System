import React, { useState } from 'react'
import { Input, Container, Box, Stack, Text, Heading, Link } from '@chakra-ui/react'
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react'

import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom"
import { signupCall } from '../api_calls/auth_api'

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isFetching, setIsFetching] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errorMessage, setErrorMessage] = useState('')

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()

  const redirectLogin = () => {
    onClose()
    navigate("/login", { replace: true })
  }

  const handleSubmit = async (event) => {

    setIsFetching(true)

    event.preventDefault();
    const data = await signupCall({ name, email, password })

    if (data.success) {
      onOpen()
      setErrorMessage("Account Created! Please login.")
    }
    else {
      onOpen()
      setErrorMessage(data.error)
    }

    setIsFetching(false)
  }

  return (

    <>

      <Modal isOpen={isOpen} onClose={errorMessage === "Account Created! Please login." ? redirectLogin: onClose}>
        <ModalOverlay />
        <ModalContent margin={"6"} borderRadius={"5"} background={"#0bc5ea"}>
          <ModalHeader padding={"9px 12px"} textAlign={"center"}>{errorMessage}</ModalHeader>
          <ModalCloseButton/>
        </ModalContent>
      </Modal>

      <Container maxW="100vw" height="100vh" bg='#14151e'>

        <Container maxW="2xl" centerContent height={"100vh"}>

          <Stack spacing={4} direction='column' my={"auto"} minWidth={"70%"}>

            <Stack direction='column' color="#fffffc" spacing={4}>

              <LockIcon boxSize={10} color="#0bc5ea" mx={"auto"} />
              <Heading as='h1' size='xl' textAlign={"center"}>
                Create an account
              </Heading>

              <Text fontSize='md' textAlign={"center"}>
                Already have an account?
                <Link color='#0bc5ea' _hover={{ color: "#00b5d8" }} href='/login'> Log in</Link>
              </Text>

            </Stack>

            <Box paddingY='7' paddingX='8' bg='#171923' borderRadius="10px" color='white' width="100%" boxShadow="0px 0px 7px 0px #868686bd" my="5">
              <form onSubmit={handleSubmit}>
                <FormControl isRequired marginY={2}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Enter name"
                    size="md"
                    type="text"
                    border="1px solid #4c4c4c"
                    onChange={event => setName(event.currentTarget.value)}
                  />
                </FormControl>

                <FormControl isRequired marginTop={"4"} marginBottom={"0"}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Enter email"
                    size="md"
                    type="email"
                    border="1px solid #4c4c4c"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </FormControl>

                <FormControl isRequired marginY='4'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      border="1px solid #4c4c4c"
                      onChange={event => setPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick} bg={"transparent"} _hover={{ bg: 'transparent' }}>
                        {show ? <ViewIcon h={"5"} w={"5"} color="#0bc5ea" _hover={{ color: '#00b5d8' }} /> : <ViewOffIcon h={"5"} w={"5"} color="#0bc5ea" _hover={{ color: '#00b5d8' }} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  isLoading={isFetching}
                  loadingText='Loading'
                  colorScheme='cyan'
                  spinnerPlacement='end'
                  type="submit"
                  width="full"
                  color="black"
                  marginY="2"
                >
                  Sign up
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
      </Container>
    </>
  )
}

export default Signup