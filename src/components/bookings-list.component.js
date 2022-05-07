import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const Booking = props => (
  <tr>
    <td>{props.booking.groomname}</td>
    <td>{props.booking.bridename}</td>
    <td>{props.booking.contactno}</td>
    <td>{props.booking.date.substring(0,10)}</td>
    <td>{props.booking.venue}</td>
    <td>{props.booking.package}</td>
    <td>
    
      <Link to={"/Bedit/"+props.booking._id} className='btn btn-info'><i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit</Link> | <a href="#" onClick={() => { props.deleteBooking(props.booking._id) }} className = 'btn btn-danger'><i class="fa-solid fa-trash"></i>&nbsp;Delete</a>
    </td>
  </tr>
)

export default class BookingsList extends Component {
  constructor(props) {
    super(props);
    this.deleteBooking = this.deleteBooking.bind(this)
    this.state = {bookings: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5001/bookings/')
      .then(response => {
        this.setState({ bookings: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBooking(id) {
    axios.delete('http://localhost:5001/bookings/'+id)
      .then(response => { console.log(response.data)});
      alert("Booking details deleted successfully");

    this.setState({
      bookings: this.state.bookings.filter(el => el._id !== id)
    })
  }

  bookingList() {
    return this.state.bookings.map(currentbooking => {
      return <Booking booking={currentbooking} deleteBooking={this.deleteBooking} key={currentbooking._id}/>;
    })
  }

 //Search
  filterData(bookings, searchKey){
    const result = bookings.filter((Booking) =>
      Booking.groomname.includes(searchKey) ||  Booking.bridename.includes(searchKey)
  
  )

  this.setState({bookings:result})

}
handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;
    axios.get('http://localhost:5001/bookings/')
      .then(response => {
        this.filterData(response.data, searchKey)
      
      })

     

    

      .catch((error) => {

        console.log(error);

      })

    }
    //report
    exportPDF = () => {

      const unit = "pt";

      const size = "A3"; // Use A1, A2, A3 or A4

      const orientation = "portrait"; // portrait or landscape

   

      const marginLeft = 40;

      const doc = new jsPDF(orientation, unit, size);

   

      doc.setFontSize(15);

   

      const title = "My Bookings";

      const headers = [['Groomname','Bridename','Contact No', 'Date', 'Package', 'Venue']];

   

      const data = this.state.bookings.map(elt=> [elt.groomname, elt.bridename, elt.contactno, elt.date, elt.package, elt.venue]);

      

      let content = {

        startY: 50,

        head: headers,

        body: data

      };

   

      doc.text(title, marginLeft, 40);

      doc.autoTable(content);

      doc.save("MyBookings.pdf")

    }

  render() {
    return (
      <div>
        <h3>Logged Bookings</h3>
        <div class="input-group">

          <div class="form-outline">

              <input id="search-focus" type="search"  class="form-control" placeholder='Search ' onChange={this.handleSearchArea}/>

             

          </div>

         </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Groomname</th>
              <th>Bridename</th>
              <th>Contactno</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Package</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bookingList() }
          </tbody>
        </table>
        <div>
        <Link to="#" onClick={()=>this.exportPDF()} className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
        </div>
      </div>
    )
  }
}