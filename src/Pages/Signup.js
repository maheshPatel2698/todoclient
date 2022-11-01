import React, { useState } from 'react'
import { FormControl, Input, FormLabel, Button, Heading, Stack, useToast } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
import "../Css/Signup.css"
import axios from 'axios'
import { signUp } from '../Config/firebaseconfig'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const toast = useToast()
    const navigate = useNavigate()



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleAuth = async () => {
        const { user } = await signUp()
        setName(user?.displayName)
        setEmail(user?.email)
    }

    const handleSignup = async () => {
        let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/user/signup`
        let User = {
            name,
            email,
            password
        }
        try {
            const response = await axios.post(url, User)
            toast({
                position: "top",
                title: `Signup ${response.data.success ? "SuccessFull" : "Failure"}`,
                description: "Signup SuccessFull Login with email",
                status: `${response.data.success ? "success" : "error"}`,
                duration: 2000,
                isClosable: true,
            })
            setName("")
            setEmail("")
            setPassword("")
            return navigate('/login')


        } catch (error) {
            toast({
                position: "top",
                title: "All field required",
                description: `${error.response.data.message}`,
                status: 'warning',
                duration: 3000,
                isClosable: true,

            })
        }


    }

    return (
        <>
            <Heading textAlign="center" size='xl'>Signup Form</Heading>
            <div className="signupform">

                <FormControl>
                    <FormLabel>Your Name</FormLabel>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        name='name'
                        placeholder='Type Your Name Here'
                    />

                    <FormLabel>Your Email</FormLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        name='email'
                        placeholder='Type Your Email Here'
                    />

                    <FormLabel>Your Password</FormLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        name='password'
                        placeholder='Type Your Password Here'
                    />


                    <Stack spacing={4} direction='row' justifyContent='center' align='center'>
                        <Button onClick={handleSignup} m={2} colorScheme="blue">Submit</Button>
                        <Button onClick={handleAuth} width='auto' leftIcon={<FcGoogle size={25} />}>
                            Signup with Google
                        </Button>
                    </Stack>

                </FormControl>
            </div>
        </>
    )
}

export default Signup