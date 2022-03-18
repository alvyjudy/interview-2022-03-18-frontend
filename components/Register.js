import { useEffect, useState } from 'react'

import axios from 'axios'

const Register = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')


  useEffect(() => {
    setTimeout(() => {
      setDisplayErrorMessage(false)
    }, 500)
  }, [email, setEmail])
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          setDisplayErrorMessage(false)
          setStatusMessage('Verifying your credential')
          if (email && password) {
            axios
            .get('/api/users')
            .then(response => response.data)
            .then(users => {
              console.log(users)
              const duplicated = users.some(user => user.email === email)
              if (duplicated) {
                setDisplayErrorMessage(true)
                setErrorMessage("Email already registered")
                throw new Error("Email already registered")
              } else {
                return true
              }
            })
            .then(() => {
              setStatusMessage('Registering your account')
              return axios.post('/api/users', { email, password })
            })
            .then(() => {
              setStatusMessage("Logging you in")
              return axios.post('/api/auth', {email, password})
            })
            .then(() => {
              setStatusMessage('')
              console.log('success')
              //href.location = '/home'
            })
            .catch(() => {
              setStatusMessage('')
              setErrorMessage("Something went wrong")
              setDisplayErrorMessage(true)
              console.log('error')
            })
          } else {
            setErrorMessage('Email and password cannot be empty')
            setDisplayErrorMessage(true)
          }
                  
        }}
      >
        <h1>Registration</h1>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <button>注册</button>
        {errorMessage && displayErrorMessage && <p>{errorMessage}</p>}
        {statusMessage && <p>{statusMessage}</p>}
      </form>
    </div>
  )
}

export default Register
