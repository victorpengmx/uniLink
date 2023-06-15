import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ViewForumpost from './pages/ViewForumpost'
import ForumpostForm from './pages/ForumpostForm'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path = "/"
              element = {user ? <Home /> : <Navigate to="/login"></Navigate>}
            />
            <Route
              path = "/login"
              element = {!user ? <Login /> : <Navigate to="/"></Navigate>}
            />
            <Route
              path = "/signup"
              element = {!user ? <Signup /> : <Navigate to="/"></Navigate>}
            />
            <Route
              path = "/forumpostform"
              element = {user ? <ForumpostForm /> : <Navigate to="/login"></Navigate>}
            />
            <Route
              path = "/viewforumposts/:id"
              element = {user ? <ViewForumpost /> : <Navigate to="/login"></Navigate>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
