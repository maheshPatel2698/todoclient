import React from 'react'
import TodoItem from './TodoItem'
import "../Css/Todos.css"
import { useSelector } from 'react-redux'
import { Heading } from '@chakra-ui/react'
const Todos = () => {
    const { Todos } = useSelector(state => state.todoReducer)
    return (
        <div className='todos-container'>
            {Todos.length === 0 ?
                <Heading textAlign="center" size='xl'>No Todos!</Heading>
                : <TodoItem />}
        </div>
    )
}

export default Todos