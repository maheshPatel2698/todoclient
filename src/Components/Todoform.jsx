import React, { useState, useEffect } from 'react'
import { FormLabel, Input, Stack, Button, Heading, FormControl, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { AllTodos, updateTodo } from "../Redux/Actions/actions"

const Todoform = () => {
  const { Todo, Todos, isUpdate } = useSelector(state => state.todoReducer)


  useEffect(() => {
    if (Todo) {
      setTitle(Todo?.title)
      setDescription(Todo?.description)
      setTag(Todo?.tag)
    }
  }, [Todo])

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.userReducer)
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')

  const handleUpdate = async () => {
    try {
      let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/todo/updatetodo/${Todo?._id}`
      let Updatetodo = {
        title,
        description,
        tag
      }

      const response = await axios.put(url, Updatetodo, {
        new: true,
        headers: {
          'Authorization': token
        }
      })
      for (let index = 0; index < Todos.length; index++) {
        const element = Todos[index]
        if (element._id === Todo._id) {
          Todos[index].title = response.data.updatedTodo.title
          Todos[index].description = response.data.updatedTodo.description
          Todos[index].tag = response.data.updatedTodo.tag
          break;
        }

      }
      dispatch(updateTodo(null, false))
      toast({
        position: 'top',
        title: 'Updated !',
        description: response.data.message,
        status: 'success',
        isClosable: true,
        duration: 2000
      })
      setTitle('')
      setDescription('')
      setTag('')


    } catch (error) {
      console.log(error.response.data.messgae)

    }
  }

  const handleAddTodo = async () => {

    try {
      if (!(title || description || tag || token)) {
        return toast({
          position: 'top',
          title: 'Error Occured',
          description: 'some information is missing ',
          status: 'warning',
          isClosable: true,
          duration: 2000
        })
      }
      let url = `${process.env.REACT_APP_API_ROUTE}/api/v1/todo/addtodo`
      let todo = {
        title,
        description,
        tag
      }

      const response = await axios.post(url, todo, {
        headers: {
          'Authorization': token
        }
      })
      dispatch(AllTodos([...Todos, response.data.todo]))
      setTitle('')
      setDescription('')
      setTag('')
      toast({
        position: 'top',
        title: 'Todo  Added',
        description: response.data.message,
        status: 'success',
        isClosable: true,
        duration: 2000

      })

    } catch (error) {
      console.log(error)
      toast({
        position: 'top',
        title: 'Todo Not Added',
        description: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 2000
      })
      setTitle('')
      setDescription('')
      setTag('')
    }

  }

  const handleActions = async () => {
    isUpdate ? handleUpdate() : handleAddTodo()
  }

  return (
    <>
      <Heading textAlign="center" size='xl'>Todo Form</Heading>
      <div className="signupform">

        <FormControl>

          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            name='title'
            placeholder='Type Your Title Here'
          />
          <FormLabel>Desctiption</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            name='description'
            placeholder='Type Your Description Here'
          />
          <FormLabel>Tag</FormLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            type='text'
            name='tag'
            placeholder='Type Your Tag Here'
          />
          <Stack spacing={4} direction='row' justifyContent='center' align='center'>
            <Button onClick={handleActions} m={2} colorScheme="blue">{isUpdate ? "Update Todo" : "Add Todo"}</Button>
          </Stack>

        </FormControl>
      </div>
    </>
  )
}

export default Todoform