import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";




export default class SingleView extends Component {
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
  onNavigateEditNote= () => {
    
    this.props.history.push("/edit/"+ this.props.match.params.id ) ;
   
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
      <h3>My Note</h3>
      <form >
        <div className="form-group"> 
          <label>Title: </label>
          <input type="text"
              readOnly
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
          
        </div>
        <div className="form-group"> 
          <label>Note: </label>
          <input  type="text" 
              readOnly
              className="form-control"
              value={this.state.noteDes}
              onChange={this.onChangeNoteDes}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
                readOnly
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        
        <div className="form-group">
            <button onClick={this.onNavigateEditNote} className="btn btn-primary">Edit</button>
            
        </div>

      </form>
    </div>
    );
  }
}
