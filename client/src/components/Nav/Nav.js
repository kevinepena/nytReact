import React from "react";
import { NavLink } from 'react-router-dom'
import {Typist} from "react-typist";
const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <NavLink to='/' className="navbar-brand" style={{marginLeft:"0"}}>
        New York Times Reading List
        </NavLink>
        <NavLink to='/Saved' className="navbar-brand" style={{marginLeft:"0"}}>Saved</NavLink>
      </div>
    </div>
  </nav>;

export default Nav;
