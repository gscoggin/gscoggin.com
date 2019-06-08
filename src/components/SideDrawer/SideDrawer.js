import React from 'react';

import "./SideDrawer.css";

const sideDrawer = props => (
  <nav className="side-drawer">
    <ul>
      <li><a href="/">Projects</a></li>
      <li><a href="/">Profile</a></li>
      <li><a href="/">Contact</a></li>
    </ul>
  </nav>
);

export default sideDrawer; 