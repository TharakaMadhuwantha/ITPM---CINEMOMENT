import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      contact: '',
      address: "",
      email: "",
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          contact: response.data.contact,
          address: response.data.address,
          email: response.data.email,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  onChangeUserName(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      contact: this.state.contact,
      address: this.state.address,
      email: this.state.email,
    }

    console.log(user);

    axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>User Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
              />
          
        </div>
        <div className="form-group"> 
          <label>Contact: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.contact}
              onChange={this.onChangeContact}
              />
        </div>
        <div className="form-group">
          <label>Address: </label>
          <div>
            <input type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email: </label>
          <div>
            <input type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
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