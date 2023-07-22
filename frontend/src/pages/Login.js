import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div>
            {!user && (
                <form className="login" onSubmit={handleSubmit}>
                    <h3>Login</h3>

                    <label>Email:</label>
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                    />
                    
                    <label>Password:</label>
                    <input 
                        type="password" 
                        onChange={(event) => setPassword(event.target.value)}
                        value={password} 
                    />

                    <br/>
                    <button disabled={isLoading}>Log in</button>

                    {/* displays error if there exists one */}
                    {error && <div className='error'>{error}</div>}
                </form>
            )}
        </div>
    )
}

export default Login