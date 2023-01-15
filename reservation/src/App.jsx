import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {/* <Route path="/home">
            <HomePage
              postModalIsOpen={postModalIsOpen}
              setPostModalOpen={setPostModalOpen}
              closePostModal={closePostModal}
              setAlert={setAlert}
            />
          </Route> */}
          {/* <Route path="/profile/:userId?">
            <ProfilePage
              postModalIsOpen={postModalIsOpen}
              setPostModalOpen={setPostModalOpen}
              closePostModal={closePostModal}
              setAlert={setAlert}
            />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
