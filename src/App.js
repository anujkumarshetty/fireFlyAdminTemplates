import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MenuAppBar from './components/AppBar/appbar';

class App extends Component {
  render() {
    return (
      <div >
        <MenuAppBar />
        <div className="container">
        </div>
      </div>
    );
  }
}

export default App;
