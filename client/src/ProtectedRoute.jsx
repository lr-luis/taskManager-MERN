import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"


function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  console.log('user', 'isAuthenticated')
  console.log(isAuthenticated)
  console.log('loading-->', loading)
  if (loading) return <h1>
    loading...
  </h1>
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace/>
  }
  return <Outlet/> // that is, it continue with the component that is inside
  
}

export default ProtectedRoute