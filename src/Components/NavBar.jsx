import React from 'react'
import "../Css/NavBar.css"
import { useColorMode, IconButton } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { authUser, logOut } from '../Redux/Actions/actions'
import { BsSun, BsMoon } from "react-icons/bs"
import { FaUser } from "react-icons/fa"


const NavBar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode()

    const handleLogout = () => {
        dispatch(logOut(null))
        dispatch(authUser(null))
        localStorage.removeItem('user')
        localStorage.removeItem('token')

    }
    return (
        <div className='main-box'>
            <div className="left">
                <span>Todo App</span>
            </div>
            <div className="mid">
                <span onClick={() => navigate('/todoform')}>
                    Add Todo
                </span>
            </div>

            <div className="right">
                <span onClick={() => navigate('/signup')}>Signup</span>
                {!user?.email ?
                    <span onClick={() => navigate('/login')}>Login</span> :
                    <span onClick={handleLogout}>Logout</span>
                }
                <span onClick={() => navigate('/user')}><FaUser size={30} /></span>
                <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <BsMoon /> : <BsSun />} />
            </div>
        </div>
    )
}

export default NavBar