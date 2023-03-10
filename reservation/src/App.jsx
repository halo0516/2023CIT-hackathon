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
import Doclogin from './components/Doclogin';
import Homepage from './components/Homepage'
import DocHomePage from './components/DocHomepage';

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
          <Route exact path="/doclogin">
            <Doclogin />
          </Route>
          <Route path="/home">
            <Homepage/>
          </Route>
          <Route exact path ="/dochome">
            <DocHomePage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
