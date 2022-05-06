import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const Appointment = props => (
    <tr>
      <td>{props.appointment.couplename}</td>
      <td>{props.appointment.contactno}</td>
      <td>{props.appointment.date.substring(0,10)}</td>
      <td>{props.appointment.time}</td>
      <td>{props.appointment.reason}</td>
      <td>{props.appointment.note}</td>
      <td>
        <Link to={"/Aselect/"+props.appointment._id}>edit</Link> | <a href="#" onClick={() => { props.deletePackage(props.package._id) }}>delete</a>
      </td>
    </tr>
  )

export default class SingleViewAppointment extends Component {
  constructor(props) {
    super(props);

    this.onChangeCouplename = this.onChangeCouplename.bind(this);
    this.onChangeContactno = this.onChangeContactno.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.deleteAppointment = this.deleteAppointment.bind(this)

    this.state ={appointments : []};

    this.state = {
      couplename: '',
      contactno: 0,
      date: new Date(),
      time: '',
      reason: '',
      note: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5001/appointments/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          couplename: response.data.couplename,
          contactno: response.data.contactno,
          date: new Date(response.data.date),
          time: response.data.time,
          reason: response.data.reason,
          note: response.data.note
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onNavigateEditAppointment= () => {
    
    this.props.history.push("/Aedit/" + this.props.match.params.id) ;
   
  }

  deleteAppointment(id) {
    axios.delete('http://localhost:5001/appointments/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      appointments: this.state.appointments.filter(el => el._id !== id)
    })
  }

  appointmentList() {
    return this.state.appointments.map(currentappointment => {
      return <Appointment appointment={currentappointment} deleteAppointment={this.deleteAppointment} key={currentappointment._id}/>;
    })
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

    axios.post('http://localhost:5001/appointments/update/' + this.props.match.params.id, appointment)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Appointment</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Couple Name: </label>
          <input  type="text"
              required
              readOnly
              className="form-control"
              value={this.state.couplename}
              onChange={this.onChangeCouplename}
              />
        </div>
        <div className="form-group">
          <label>Contact No: </label>
          <input 
            readOnly
              type="text" 
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
              readOnly
              className="form-control"
              value={this.state.time}
              onChange={this.onChangeTime}
              />
        </div>
        <div className="form-group"> 
          <label>Reason: </label>
          <input  type="text"
              required
              readOnly
              className="form-control"
              value={this.state.reason}
              onChange={this.onChangeReason}
              />
        </div>
        <div className="form-group"> 
          <label>Note: </label>
          <input  type="text"
              required
              readOnly
              className="form-control"
              value={this.state.note}
              onChange={this.onChangeNote}
              />
        </div>

        <div className="form-group">
        <button onClick={this.onNavigateEditAppointment} className="btn btn-primary">Edit</button> 
        </div>
      </form>
    </div>
    )
  }
}