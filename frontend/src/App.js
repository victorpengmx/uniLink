import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import "bootstrap/dist/css/bootstrap.min.css";

// pages and components
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ViewForumpost from './pages/ViewForumpost'
import ForumpostForm from './pages/ForumpostForm'
import SearchForm from "./pages/SearchForm";
import UserInfo from "./pages/UserInfo";
import ViewMyPost from "./pages/ViewMyPost";
import EventsPage from './pages/EventsPage';



function App() {
  const { user } = useAuthContext()

  return (
      <div className="App">
        <BrowserRouter>
          <NavigationBar/>
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

              <Route
                  path = "/searchform"
                  element = {user ? <SearchForm /> : <Navigate to="/login"></Navigate>}
              />

              <Route
                  path = "/userinfo"
                  element = {user ? <UserInfo /> : <Navigate to="/login"></Navigate>}
              />

              <Route
                  path = "/viewmypost"
                  element = {user ? <ViewMyPost /> : <Navigate to="/login"></Navigate>}
              />
              
              <Route
                  path = "/events"
                  element = {user ? <EventsPage /> : <Navigate to="/login"></Navigate>}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
