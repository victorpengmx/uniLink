import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import { useAuthContext } from '../hooks/useAuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div>
            {!user && (
                <form className="signup" onSubmit={handleSubmit}>
                    <h3>Sign up</h3>

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
                    <button disabled={isLoading}>Sign up</button>

                    {/* displays error if there exists one */}
                    {error && <div className='error'>{error}</div>}
                </form>
            )}
        </div>
    )
}

export default Signup