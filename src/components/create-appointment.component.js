import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);

    this.onChangeCouplename = this.onChangeCouplename.bind(this);
    this.onChangeContactno = this.onChangeContactno.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      couplename: '',
      contactno: Number,
      date: new Date(),
      time: '',
      reason: '',
      note: '',
    }
  }

  onChangeCouplename(e) {
    this.setState({
      couplename: e.target.value
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

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    })
  }

  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    })
  }

  onChangeNote(e) {
    this.setState({
      note: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const appointment = {
      couplename: this.state.couplename,
      contactno: this.state.contactno,
      date: this.state.date,
      time: this.state.time,
      reason: this.state.reason,
      note: this.state.note
    }

    console.log(appointment);

    axios.post('http://localhost:5001/appointments/add', appointment)
      .then(res => console.log(res.data));

    window.location = '/appointments';
  }

  render() {
    return (
    <div>
      <h3>Add New Appointment </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Couple Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.couplename}
              onChange={this.onChangeCouplename}
              />
        </div>
        <div className="form-group">
          <label>Contact No: </label>
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
        </div>
        <div className="form-group"> 
          <label>Time: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.time}
              onChange={this.onChangeTime}
              />
        </div>
        <div className="form-group"> 
          <label>Reason: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.reason}
              onChange={this.onChangeReason}
              />
        </div>
        <div className="form-group"> 
          <label>Note: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.note}
              onChange={this.onChangeNote}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add Appointment" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}