import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Facebook from '../Icons/Facebook.png';
import Gmail from '../Icons/Gmail.png';
import Instagram from '../Icons/Instagram.png';
import PhoneOut from '../Icons/Phone-out.png';
import Whatsapp from '../Icons/Whatsapp.png';
import './myStyles.css';




export default class Footer extends Component {
    render() {
      return (
        <div className="footer">
            
          <div className="overlap-groupf">
            <div className="f_-categories">
              <div className="categories">
                Categories
              </div>
              <div className="booking-appointment-packages">
                Booking
                <br />
                Appointment
                <br />
                Packages
              </div>
            </div>
            <div className="f_-information">
              <div className="informations">
                Informations
              </div>
              <div className="faq-about-us">
                FAQ
                <br />
                About Us
              </div>
            </div>
            <div className="f_-useraccount">
              <div className="user-account">
                User Account
              </div>
              <div className="my-account">
                My Account
              </div>
            </div>
            <div className="f_-contact_-us">
              <div className="contact-usroboto-normal-black-18px">
                Contact Us
              </div>
              <div className="flex-row">
                <img className="icon-call" src={PhoneOut} />
                <div className="phoneroboto-normal-black-18px">
                  076 989 5629
                </div>
              </div>
              <div className="flex-row-1">
                <img className="outline-brands-whatsapp" src={Whatsapp} />
                <div className="phoneroboto-normal-black-18px">
                  076 989 5629
                </div>
              </div>
              <div className="gmail-container">
                <img className="outline-brands-gmail" src={Gmail} />
                <div className="cinemomentweddingfilmsgmailcomroboto-normal-black-18px">
                  cinemomentweddingfilms@gmail.com
                </div>
              </div>
            </div>
            <div className="f_-follow_-us_-on">
              <div className="follow-us-onroboto-normal-black-18px">
                Follow Us On
              </div>
              <div className="flex-row-2">
                <img className="icon-instagram" src={Instagram} />
                <div className="cinemomentweddingfilmsroboto-normal-black-18px">
                  cinemomentweddingfilms
                </div>
              </div>
              <div className="flex-row-3">
                <img className="icon-facebook" src={Facebook} />
                <div className="cinemoment-wedding-filmsroboto-normal-black-18px">
                  Cinemoment Wedding Films
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
