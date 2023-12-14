import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path='/login' element={<h1>Login page</h1>} />
        <Route path='/register' element={<h1>Sign up page</h1>} />
        <Route path='/task' element={<h1>Tasks page</h1>} />
        <Route path='/addTask' element={<h1>Create task</h1>} />
        <Route path='/task/:id' element={<h1>Update task</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App