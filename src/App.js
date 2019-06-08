import React, { Component } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import drawerToggleButton from './components/SideDrawer/DrawerToggleButton';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState}
    })
  };

  render() {
  return (
    <div className="App">
      {/* <nav className="Nav-bar>">
        What's here
      </nav>
      <header className="App-header">Test
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Banana <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Toolbar />
      <SideDrawer />
      <Backdrop />
      <main style={{marginTop: '64px'}}>
        <p>This is the page content!</p>
      </main>
    </div>
  );
}
}

export default App;
