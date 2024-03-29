import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from '../api/auth';

export const AuthContext = createContext()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user)
      console.log('res-->', res.data)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      // console.log('error', error)
      setErrors(error.response.data)
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log('res::', res)
    } catch (error) {
      console.error(error)
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
      
    }
  }

  useEffect(() =>{
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])
  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      user,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  )
}