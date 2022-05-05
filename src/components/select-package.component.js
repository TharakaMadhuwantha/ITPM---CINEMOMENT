import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Package = props => (
  <tr>
    <td>{props.package.packagename}</td>
    <td>{props.package.packagetype}</td>
    <td>{props.package.amount}</td>
    <td>{props.package.description}</td>
    <td>
      <Link to={"/select/"+props.package._id}>edit</Link> | <a href="#" onClick={() => { props.deletePackage(props.package._id) }}>delete</a>
    </td>
  </tr>
)

export default class EditPackage extends Component {
  constructor(props) {
    super(props);

    this.onChangePackagename = this.onChangePackagename.bind(this);
    this.onChangePackagetype = this.onChangePackagetype.bind(this);
    this.onChangeCameras = this.onChangeCameras.bind(this);
    this.onChangeDrons = this.onChangeDrons.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.deletePackage = this.deletePackage.bind(this)

    this.state = {packages: []};

    this.state = {
      packagename :'',
      packagetype: '',
      cameras:'',
      drons:'',
      amount: 0,
      description: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5001/packages/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          packagename: response.data.packagename,
          packagetype: response.data.packagetype,
          cameras: response.data.cameras,
          drons: response.data.drons,
          amount: response.data.amount,
          description: response.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  onNavigateEditPackage= () => {
    
    this.props.history.push("/edit/" + this.props.match.params.id) ;
   
  }


  deletePackage(id) {
    axios.delete('http://localhost:5001/packages/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      packages: this.state.packages.filter(el => el._id !== id)
    })
  }

  packageList() {
    return this.state.packages.map(currentpackage => {
      return <Package package={currentpackage} deletePackage={this.deletePackage} key={currentpackage._id}/>;
    })
  }

  onChangePackagename(e) {
    this.setState({
      packagename: e.target.value
    })
  }

  onChangePackagetype(e) {
    this.setState({
      packagetype: e.target.value
    })
  }

  onChangeCameras(e) {
    this.setState({
      cameras: e.target.value
    })
  }

  onChangeDrons(e) {
    this.setState({
      drons: e.target.value
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const Package = {
      packagename: this.state.packagename,
      packagetype: this.state.packagetype,
      cameras: this.state.cameras,
      drons: this.state.drons,
      amount: this.state.amount,
      description: this.state.description
    }

    console.log(Package);

    axios.post('http://localhost:5001/packages/update/' + this.props.match.params.id, Package)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Package</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Package Name: </label>
            <input type="text" readOnly
              required
              className="form-control"
              value={this.state.packagename}
              onChange={this.onChangePackagename}
            />
          </div>
          <div className="form-group">
            <label>Package Type: </label>
            <input type="text" readOnly
              required
              className="form-control"
              value={this.state.packagetype}
              onChange={this.onChangePackagetype}
            />
          </div>
          <div className="form-group">
            <label>Cameras: </label>
            <input type="text" readOnly
              required
              className="form-control"
              value={this.state.cameras}
              onChange={this.onChangeCameras}
            />
          </div>
          <div className="form-group">
            <label>Drons: </label>
            <input type="text" readOnly
              required
              className="form-control"
              value={this.state.drons}
              onChange={this.onChangeDrons}
            />
          </div>
          <div className="form-group">
            <label>Amount (in LKR): </label>
            <input readOnly
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input readOnly
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
          <button onClick={this.onNavigateEditPackage} className="btn btn-primary">Edit</button> 
          </div>
        </form>
      </div>
    )
  }
}