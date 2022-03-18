
import { useState } from 'react'

import axios from 'axios'

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return <div>
    <form onSubmit={(e) => {
      e.preventDefault()
      console.log(email, password)
      axios.post('/api/users', {email, password}).then(response => {
        console.log(response)
      })
    }}>
      <input
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      />
      <input
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <button>Submit</button>
    </form>
    
  </div>
}

export default Register