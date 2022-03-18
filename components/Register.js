import { useEffect, useState } from 'react'

import axios from 'axios'

const Register = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')


  useEffect(() => {
    setDisplayErrorMessage(false)
  }, [email, password])

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          setDisplayErrorMessage(false)

          if (!email || !password) {
            setDisplayErrorMessage(true)
            setErrorMessage("Email or password cannot be empty")
            return 
          }

          if (password.length <= 8) {
            setDisplayErrorMessage(true)
            setErrorMessage("Password must be longer than 8 characters")
            return
          }
         
          if (email && password) {
            setStatusMessage('Verifying your credential')
            axios
            .get('/api/users')
            .then(response => response.data)
            .then(users => {
              console.log(users)
              const duplicated = users.some(user => user.email === email)
              if (duplicated) {
                throw new Error("Custom::Email already registered")
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
              location.href = '/home'
            })
            .catch((e) => {
              setStatusMessage('')
              if (e.message.startsWith('Custom')) {
                setErrorMessage(e.message.split('::')[1])
              } else {
                setErrorMessage('Unable to register your account')
              }
              setDisplayErrorMessage(true)
              console.log('error', e)
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
      <div style={{
        "position": "absolute",
        "bottom": "100px"
      }
      }>
        <p> 
          Scenarios <br/>
          1. 重复邮件: 120@gmail.com <br/>
          2. 格式不对的邮件 <br/>
          3. 空密码或邮件 <br/>
          4. 注册失败: 1@fail.com <br />
          5. 小于8位的密码 
        </p>
      </div>
    </div>
  )
}

export default Register
