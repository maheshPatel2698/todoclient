import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Badge, Heading } from "@chakra-ui/react"

import "../Css/User.css"
const User = () => {
    const { Todos } = useSelector(state => state.todoReducer)
    const { user } = useSelector(state => state.userReducer)


    return (
        <div className='usercard'>
            <Heading textAlign="center" size='xl'>User Details</Heading>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>

                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            Total Todos: {Todos?.length}
                        </Badge>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            ml='2'
                        >
                            {user?.name}
                            <br />
                            {user?.email}
                        </Box>
                    </Box>
                </Box>

            </Box>
        </div>
    )

}

export default User