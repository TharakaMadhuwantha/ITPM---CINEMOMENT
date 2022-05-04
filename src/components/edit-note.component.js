import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class EditNote extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNoteDes = this.onChangeNoteDes.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      noteDes: '',
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/notes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          noteDes: response.data.noteDes,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeNoteDes(e) {
    this.setState({
      noteDes: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const note = {
      title: this.state.title,
      noteDes: this.state.noteDes,
      date: this.state.date
    }

    console.log(note);

    axios.post('http://localhost:5000/notes/update/' + this.props.match.params.id, note)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Note</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
          
        </div>
        <div className="form-group"> 
          <label>Note: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.noteDes}
              onChange={this.onChangeNoteDes}
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
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}