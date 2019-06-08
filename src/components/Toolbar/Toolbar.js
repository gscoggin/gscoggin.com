import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div>
        <DrawerToggleButton />
      </div>
        <div className="toolbar__logo"><a href="/">THE LOGO</a></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
              <li><a href="/">Projects</a></li>
              <li><a href="/">Profile</a></li>
              <li><a href="/">Contact</a></li>
          </ul>
        </div>

    </nav>
  </header>
);

export default toolbar;