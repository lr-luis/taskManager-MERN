import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/task' element={<h1>Tasks page</h1>} />
        <Route path='/addTask' element={<h1>Create task</h1>} />
        <Route path='/task/:id' element={<h1>Update task</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App