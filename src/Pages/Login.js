import React, { useState } from 'react'
import "../Css/Signup.css"
import { FormLabel, Input, Stack, Button, Heading, FormControl, useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, authUser } from "../Redux/Actions/actions"
import axios from 'axios'
import { Navigate } from "react-router-dom"

const Login = () => {
    const { user } = useSelector(state => state.userReducer)

    const toast = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()



    const hadleLogin = async () => {
        let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/user/login`

        let userCreds = {
            email,
            password
        }
        try {
            const response = await axios.post(url, userCreds)
            dispatch(logIn(response.data.user))
            dispatch(authUser(response.data.token))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            toast({
                position: 'top',
                status: "success",
                title: "Login Successfull",
                description: "You can now Add todos",
                duration: 2000,
                isClosable: true
            })

        } catch (error) {
            toast({
                position: 'top',
                status: "error",
                title: "Login Failed",
                description: error.response.data.message,
                duration: 2000,
                isClosable: true
            })

        }


    }
    if (user?.email) {
        return <Navigate to='/todoform' />
    }
    return (
        <>
            <Heading textAlign="center" size='xl'>Login Form</Heading>
            <div className="signupform">

                <FormControl>

                    <FormLabel>Your Email</FormLabel>
                    <Input
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        name='email'
                        placeholder='Type Your Email Here'
                    />

                    <FormLabel>Your Password</FormLabel>
                    <Input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        name='password'
                        placeholder='Type Your Password Here'
                    />


                    <Stack spacing={4} direction='row' justifyContent='center' align='center'>
                        <Button onClick={hadleLogin} m={2} colorScheme="blue">Submit</Button>
                    </Stack>

                </FormControl>
            </div>
        </>
    )
}

export default Login