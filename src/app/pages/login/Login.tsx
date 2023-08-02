import { useState } from "react"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log(email)
    console.log(password)
  }

  return (
    <div>
      <form action="">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Entrar</button>
      </form>
    </div>
  )
}