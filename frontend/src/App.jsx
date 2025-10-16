import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate,} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
    const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <div className="App">
        <h1 className='text-6xl font-bold text-center text-green-800'
        >AI Dashboard</h1>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
          <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
