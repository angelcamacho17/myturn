import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EditTurn from "./components/EditTurn";
import TurnsList from "./components/TurnsList";
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Modal from './components/ModalPage';

//import logo from "./logo.svg";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile" component={Profile}/>  
            <Route exact path="/turn" component={TurnsList} />
            <Route exact path="/edit/:id" component={EditTurn} />
            <Route exact path="/modal" component={Modal} />
          </div>
        </div>

      </Router>
    );
  }
}

export default App;