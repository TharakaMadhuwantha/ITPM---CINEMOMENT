import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

import './myStyles.css'
import styled from "styled-components";



const NavUnlisted = styled.ul`
  text-decoration: wavy;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "wavy",
  color: 'black'
};

export default class Navbar extends Component {
    render() {
        return(
          <div className="header">

            <img className="header-rect" src="" />
            <img className="cinemoment-logo-png-1" src={logo} alt="logo" />
            <a className='myaccount' href="/user" > <i class="fa-solid fa-user">My Account</i></a>
            <div className="container">
              <div className="menu-bar">
                <div>
                <a href="/create" className="button from-top">Home</a>
                   
                   
                </div>

                <div className="overlap-group1">
                  <div>
                    <Link to="" className="bookingroboto-normal-black-18px" style={linkStyle}>Booking</Link>
                  </div>
                </div>
                <div className="overlap-group2">
                  <div>
                    <Link to="" className="appointmentroboto-normal-black-18px" style={linkStyle}>Appointment</Link>
                  </div>
                </div>
                <div class="dropdown">
                  <button class="dropbtn">EventHandler</button>
                  <div class="dropdown-content">
                    <a href="#">Add Package</a>
                    <a href="/create">Add Note</a>
                    <a href="/">My Notes</a>
                  </div>
                </div>
              </div>
            </div>


          </div>
        );
            
        
    }
}