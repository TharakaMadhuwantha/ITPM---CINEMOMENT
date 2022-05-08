import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './myStyles.css'
import styled from "styled-components";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'

const NavUnlisted = styled.ul`
  text-decoration: none;
`;
const linkStyle = {
  margin: "1rem",
  textDecoration: "wavy",
  color: 'white',
  
};
const Note = props => (
  <tr>
    <td>{props.note.title}</td>
    {/* <td>{props.note.noteDes}</td> */}
    <td>{props.note.date.substring(0,10)}</td>
    <td>
      
      <Link className="btn btn-outline-warning" to={"/single/"+props.note._id} ><i class="fa-solid fa-eye"></i>&nbsp;View More</Link> | <a className="btn btn-danger" href="#" onClick={() => { props.deleteNote(props.note._id) }}><i className="far fa-trash-alt" ></i>&nbsp;Delete</a>
      
    </td>
  </tr>
)
export default class MyNotes extends Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this)
    this.state = {notes: []};
  }
  
/**Getting all values of notes document with GET method */
  componentDidMount() {
    axios.get('http://localhost:5001/notes/')
      .then(response => {
        this.setState({ notes: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /**Delete row using row id with DELETE method */
  deleteNote(id) {
    axios.delete('http://localhost:5001/notes/'+id)
      .then(response => { console.log(response.data)});
      alert("Note details deleted successfully");

    this.setState({
      notes: this.state.notes.filter(el => el._id !== id)
    })
  }

  noteList() {
    return this.state.notes.map(currentnote => {
      return <Note note={currentnote} deleteNote={this.deleteNote} key={currentnote._id}/>;
    })
  }
  /**Search by date */
  filterData(notes, searchKey){
    const result = notes.filter((Note) =>
    Note.date.includes(searchKey)
    )
    this.setState({notes:result})
  }
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get('http://localhost:5001/notes/')
      .then(response => {
          this.filterData(response.data, searchKey) 
        }) 
      .catch((error) => {
        console.log(error);
      })
    }
    /*generate report */
    exportPDF = () => {
      const unit = "pt";
      const size = "A3"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      const title = "My Notes";
      const headers = [['Title','Description','Date']];
      const data = this.state.notes.map(elt=> [elt.title, elt.noteDes,elt.date]);
    
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
    
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("MyNotes.pdf")
    }

  render() {
    return (
      <div>
        <h3>My Notes</h3>
        <br/>
        <div class="input-group">
          <div class="form-outline">
          
          <input id="search-focus" type="search"  class="form-control" placeholder='Search By Date' onChange={this.handleSearchArea}> </input>
          </div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.noteList() }
          </tbody>
        </table>
        <div>
            <Link to="#" onClick={()=>this.exportPDF()} className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
        </div>
      </div>
    )
  }
}