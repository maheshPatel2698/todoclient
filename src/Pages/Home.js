import React from 'react'
import Todoform from '../Components/Todoform'

import Login from './Login'
import { useSelector } from 'react-redux'

const Home = () => {
    const { user } = useSelector(state => state.userReducer)

    return (
        <>
            {user?.email ? <Todoform /> : <Login />}
        </>
    )
}

export default Home