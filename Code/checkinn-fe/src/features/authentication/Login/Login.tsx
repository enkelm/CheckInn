import React, { FC, FormEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import Card from '../../../components/UI/Card/Card'
import { uiActions } from '../../../store/ui-slice'

// interface LoginProps {}

const Login: FC = () => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    console.log('hello')
  }

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    dispatch(uiActions.toggleModal())
  }

  return (
    <Card style={{ width: '30vw' }}>
      <form onSubmit={onSubmitHandler}>
        <button onClick={clickHandler}>Click Me</button>
      </form>
    </Card>
  )
}

export default Login
