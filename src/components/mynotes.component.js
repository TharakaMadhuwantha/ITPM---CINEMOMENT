import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './myStyles.css'
import styled from "styled-components";

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
      <NavUnlisted>
      <button className="btn btn-primary"><Link to={"/single/"+props.note._id} style={linkStyle}>View More</Link></button> | <a className="btn btn-danger" href="#" onClick={() => { props.deleteNote(props.note._id) }}><i className="far fa-trash-alt" ></i> delete</a>
      </NavUnlisted>
    </td>
  </tr>
)



export default class MyNotes extends Component {
  constructor(props) {
    super(props);

    this.deleteNote = this.deleteNote.bind(this)

    this.state = {notes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/notes/')
      .then(response => {
        this.setState({ notes: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteNote(id) {
    axios.delete('http://localhost:5000/notes/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      notes: this.state.notes.filter(el => el._id !== id)
    })
  }

  noteList() {
    return this.state.notes.map(currentnote => {
      return <Note note={currentnote} deleteNote={this.deleteNote} key={currentnote._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>My Notes</h3>
        <br/>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              {/* <th>Note</th> */}
              
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.noteList() }
          </tbody>
        </table>
      </div>
    )
  }
}