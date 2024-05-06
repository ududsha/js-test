import React from "react";
import { Link, Outlet } from "react-router-dom";

// Handling common UI layout with React Router v6+
function Layout() {
  return (
    <div>
      <div className="ui one column center aligned page relaxed grid">
        <div className="column twelve wide">
          <img src="images/logo.svg" alt="logo" />
        </div>
      </div>
      <div className="main container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
