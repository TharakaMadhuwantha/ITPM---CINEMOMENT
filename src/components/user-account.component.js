import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const User = props => (
    <div>
        userName : {props.user.username}<br/>
        Contact : {props.user.contact}<br/>
        Address : {props.user.address}<br/>
        Email: {props.user.email}<br/>
        <Link to={"/update/"+props.user._id}>edit</Link> 

    </div>



)
export default class UserProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {users: []};
      }

      



      componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      userList() {
        return this.state.users.map(currentuser => {
          return <User user={currentuser} />;
        })
      }

    render(){
        return(

            <div >
                
                {this.userList()}<br/>
                

            </div>
            
        )
    }
}