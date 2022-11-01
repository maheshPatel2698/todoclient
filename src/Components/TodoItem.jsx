import React from 'react'
import {
    Badge,
    Container,
    Heading,
    IconButton,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,

    PopoverArrow,
    PopoverCloseButton,

} from '@chakra-ui/react'

import { EditIcon, DeleteIcon, ViewIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import "../Css/TodoItem.css"
import { useSelector, useDispatch } from 'react-redux'
import { AllTodos, updateTodo } from "../Redux/Actions/actions"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const TodoItem = () => {
    const { Todos } = useSelector(state => state.todoReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()


    const handleDelete = async (id) => {
        try {
            let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/todo/deletetodo/${id}`
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            const todos = Todos.filter((todo) => {
                return todo._id !== id
            })
            dispatch(AllTodos(todos))
            return toast({
                title: response.data.message,
                status: 'success',
                isClosable: true,
                duration: 2000
            })
        } catch (error) {
            return toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: 'error',
                isClosable: true,
                duration: 2000
            })
        }

    }

    const handleUpdateTodo = (todo) => {

        dispatch(updateTodo(todo, true))
        navigate('/todoform')
    }
    return (
        <>
            {Todos.map((todo) => {
                return (
                    <div className='todo-container' key={todo._id}>

                        <Container maxW='2xl' marginTop='1' border='2' centerContent>
                            <Heading textAlign='center' size='md'>{todo?.title}
                                <br />
                                <Badge ml='1' fontSize='0.7em' colorScheme='blue'>
                                    {todo?.tag}
                                </Badge>
                                <Badge ml='1' fontSize='0.7em' colorScheme='red'>
                                    {todo?.status === false ? <CloseIcon color="red" m="2" /> : <CheckIcon color="green" />}

                                </Badge>
                            </Heading>
                            <span>{todo?.date}</span>
                            <p>

                                {todo?.description}
                            </p>
                            <div className='icon-div'>
                                <IconButton onClick={() => handleUpdateTodo(todo)} colorScheme="blue" icon={<EditIcon />} />
                                <IconButton onClick={() => handleDelete(todo._id)} colorScheme="red" icon={<DeleteIcon />} />
                                <Popover>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>{todo?.title}</PopoverHeader>
                                        <PopoverBody>
                                            <Badge ml='1' fontSize='0.7em' colorScheme='blue'>
                                                {todo?.tag}
                                            </Badge>
                                        </PopoverBody>
                                        <PopoverBody>
                                            <Badge ml='1' fontSize='0.7em' colorScheme='red'>
                                                {todo?.status === false ? <CloseIcon color="red" m="2" /> : <CheckIcon color="green" />}

                                            </Badge>
                                        </PopoverBody>
                                        <PopoverBody>
                                            {todo?.description}
                                        </PopoverBody>

                                    </PopoverContent>
                                    <PopoverTrigger>
                                        <IconButton colorScheme="blue" icon={<ViewIcon />} />
                                    </PopoverTrigger>
                                </Popover>
                            </div>
                        </Container>
                    </div>

                )
            })}

        </>
    )
}

export default TodoItem