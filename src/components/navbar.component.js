import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './myStyles.css'

export default class Navbar extends Component {

  render() {
    return (
      <div className="header">

            <img className="header-rect" src="" />
            <img className="cinemoment-logo-png-1" src={logo} alt="logo" />
            <div className="container">
              <div className="menu-bar">
                <div className="overlap-group">
                  <div>
                    <Link to="/" className="placeroboto-normal-black-18px">Home </Link>
                  </div>
                </div>
                <div className="overlap-group1">
                  <div>
                    <Link to="#" className="bookingroboto-normal-black-18px">Booking</Link>
                  </div>
                </div>
                <div className="overlap-group2">
                  <div>
                    <Link to="#" className="appointmentroboto-normal-black-18px">Appointment</Link>
                  </div>
                </div>
                <div className="dropdown">
                  <button class="dropbtn">Event Handler</button>
                  <div class="dropdown-content">
                    <a href='/create'>Add Package</a>
                    <a href='#'>Add Note</a>
                    <a href='#'>my Notes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}