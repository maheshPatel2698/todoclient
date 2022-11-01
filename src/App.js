import React, { Fragment, useEffect } from 'react'

import NavBar from "./Components/NavBar"
import Todoform from './Components/Todoform'
import { Heading } from '@chakra-ui/react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import User from "./Pages/User"
import Signup from "./Pages/Signup"
import { useDispatch, useSelector } from 'react-redux'

import { logIn, authUser, AllTodos } from "./Redux/Actions/actions"
import { Route, Routes } from 'react-router-dom'
import Todos from './Components/Todos'
import axios from "axios"

const App = () => {
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  const getAllTodos = async () => {
    if (localStorage.getItem('token') !== null) {
      let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/todo/usertodo`
      const response = await axios.get(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      dispatch(AllTodos(response.data.todos))
    }
    else {
      return
    }



  }
  useEffect(() => {
    const chekPrevuser = () => {
      const user = localStorage.getItem('user')
      if (user) {
        return dispatch(logIn(JSON.parse(user)))
      }
      else {
        return dispatch(logIn(null))
      }

    }

    const checkPrevToken = () => {
      const token = localStorage.getItem('token')
      if (token) {
        return dispatch(authUser(token))
      }
      else {
        return dispatch(authUser(null))
      }
    }
    checkPrevToken()
    chekPrevuser()
    getAllTodos()
    // eslint-disable-next-line
  }, [user?.email])

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todoform' element={<Todoform />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
      </Routes>
      {user?.email ? <Todos /> : <Heading textAlign="center" size='md'>Login To See Todos</Heading>}
    </Fragment>
  )
}

export default App