import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateBooking extends Component {
  constructor(props) {
    super(props);

    this.onChangeGroomname = this.onChangeGroomname.bind(this);
    this.onChangeBridename = this.onChangeBridename.bind(this);
    this.onChangeContactno = this.onChangeContactno.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeVenue = this.onChangeVenue.bind(this);
    this.onChangePackage = this.onChangePackage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      groomname: '',
      bridename: '',
      contactno: 0,
      date: new Date(),
      venue: '',
      package:'',
      
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5001/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            /*username: response.data[0].username*/
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeGroomname(e) {
    this.setState({
      groomname: e.target.value
    })
  }

  onChangeBridename(e) {
    this.setState({
      bridename: e.target.value
    })
  }

  onChangeContactno(e) {
    this.setState({
      contactno: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeVenue(e) {
    this.setState({
      venue: e.target.value
    })
  }

  onChangePackage(e) {
    this.setState({
      package: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const booking = {
      groomname: this.state.groomname,
      bridename: this.state.bridename,
      contactno: this.state.contactno,
      date: this.state.date,
      venue: this.state.venue,
      package: this.state.package

    }

    console.log(booking);

    axios.post('http://localhost:5001/bookings/add', booking)
      .then(res => console.log(res.data));

    window.location = '/bookings';
  }

  render() {
    return (
    <div>
      <h3>Create New Booking Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Groomname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.groomname}
              onChange={this.onChangeGroomname}
              />
        </div>
        <div className="form-group"> 
          <label>Bridename: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.bridename}
              onChange={this.onChangeBridename}
              />
        </div>
        <div className="form-group">
          <label>Contactno: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.contactno}
              onChange={this.onChangeContactno}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group"> 
          <label>Venue: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.venue}
              onChange={this.onChangeVenue}
              />
        </div>
        <div className="form-group"> 
          <label>Package: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.package}
              onChange={this.onChangePackage}
              />
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Booking Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
} 