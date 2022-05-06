import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const Appointment = props => (
  <tr>
    <td>{props.appointment.couplename}</td>
    <td>{props.appointment.contactno}</td>
    <td>{props.appointment.date.substring(0,10)}</td>
    <td>{props.appointment.time}</td>
    <td>{props.appointment.reason}</td>
    <td>{props.appointment.note}</td>
    <td>
      <Link to={"/Aselect/"+props.appointment._id}>View</Link> | <a href="#" onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a>
    </td>
  </tr>
)

export default class AppointmentsList extends Component {
  constructor(props) {
    super(props);

    this.deleteAppointment = this.deleteAppointment.bind(this)

    this.state = {appointments: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5001/appointments/')
      .then(response => {
        this.setState({ appointments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
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

  handleSearchArea = (e) =>{

    const searchKey= e.currentTarget.value;
    console.log(searchKey);

    axios.get('http://localhost:5001/appointments/')
      .then(response =>{     
        this.filterData(response.data,searchKey)
      })
      
        
  }

  filterData(appointments,searchKey){
    const result = appointments.filter((Appointment) =>
  
    Appointment.couplename.toLowerCase().includes(searchKey)
    )
    this.setState({appointments:result})
  }

  exportPDF = () => {

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "My Appointments";
    const headers = [['Couple Name','Contact No','Date','Time','Reason']];
    const data = this.state.appointments.map(elt=> [elt.couplename, elt.contactno,elt.date,elt.time,elt.reason]);
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Appointments.pdf")

  }

  render() {
    return (
      <div>

        <h3>My Appointments</h3>

        <div className="col-lg-3 mt-2 mb-2">
                  <input
                  className="form-control"
                  type="search"
                  placeholder="🔍 Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>
                  </input>
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Couple Name</th>
              <th>Contact No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.appointmentList() }
          </tbody>
        </table>
        <div>
          {/* <Link to="#" onClick={()=>this.exportPDF()} className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link> */}
          <Link onClick={()=>this.exportPDF()} to="#" className="btn btn-outline-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
        </div>
      </div>
    )
  }
}