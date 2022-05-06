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
            
            
              <div class="dropdownnn">
                <button class="dropbtnnn">Appointment</button>
                <div class="dropdown-contenttt">
                  <a href="/Acreate">Add Appointment</a>
                  <a href="/appointments">My Appointment</a>
                </div>
              </div>
              
              

              <div class="dropdownn">
                <button class="dropbtnn">Booking</button>
                <div class="dropdown-contentt">
                  <a href="/Bcreate">Add Booking</a>
                  <a href="/bookings">My Booking</a>

              </div>
             
              <div className="dropdown">
                <button class="dropbtn">Event Handler</button>
                <div class="dropdown-content">
                  <a href='/create'>Add Package</a>
                  <a href='/Ncreate'>Add Note</a>
                  <a href='/notes'>my Notes</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}