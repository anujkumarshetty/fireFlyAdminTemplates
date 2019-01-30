import React, { Component } from 'react';
import './App.css';
import MenuAppBar from './components/AppBar/appbar';
import HeaderTemplate from "./components/HeaderTemplate/headerTemplate";
import FooterTemplate from './components/FooterTemplate/footerTemplate';
class App extends Component {
  render() {
    return (
      <div >
        <MenuAppBar />
        <div className="container">
          <HeaderTemplate />
          <FooterTemplate />
        </div>
      </div>
    );
  }
}

export default App;
