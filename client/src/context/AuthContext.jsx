import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';

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
  const [loading, setLoading] = useState(true)

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
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
      
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() =>{
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin () {
      const cookies = Cookies.get()
      if (!cookies.token) { 
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }
        try {
          const res = await verifyTokenRequest(cookies.token)
          setLoading(true)
          if (!res.data) {
            setIsAuthenticated(false)
            setLoading(false)
            return
          }
          console.warn('si esta autenticado')
          setIsAuthenticated(true)
          setLoading(false)
          setUser(res.data)
        } catch (error) {
          console.error(error)
          setLoading(false)
          setIsAuthenticated(false)
          setUser(null)
        }
      
    }
    checkLogin()
  }, [])
  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      logout,
      loading,
      user,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  )
}