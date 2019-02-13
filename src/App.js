import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MenuAppBar from './components/AppBar/appbar';
import SideBar from './components/Sidebar/sideBar';

class App extends Component {
  render() {
    return (
      <div >
        {/* <MenuAppBar /> */}
        <SideBar />
        <div className="container">
        </div>
      </div>
    );
  }
}

export default App;
