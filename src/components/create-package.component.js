import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePackage extends Component {
  constructor(props) {
    super(props);

    this.onChangePackagename = this.onChangePackagename.bind(this);
    this.onChangePackagetype = this.onChangePackagetype.bind(this);
    this.onChangeCameras = this.onChangeCameras.bind(this);
    this.onChangeDrons = this.onChangeDrons.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      packagename :'',
      packagetype: '',
      cameras:'',
      drons:'',
      amount: Number,
      description: '',
    }
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

    axios.post('http://localhost:5000/packages/add', Package)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Package</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Package Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.packagename}
              onChange={this.onChangePackagename}
            />
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">Package Type</label>
            <select class="form-select" id="inputGroupSelect01" required className="form-control"
              value={this.state.packagetype}
              onChange={this.onChangePackagetype}>
              <option selected>Choose...</option>
              <option value="Wedding">Wedding</option>
              <option value="Pre-Shoot">Pre-Shoot</option>
              <option value="Birthday">Birthday</option>
            </select>
          </div>
          <div onChange={this.onChangeCameras}>
            <label >Cameras :   </label>
            <div class="form-check form-check-inline" >
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Single Camera" />
              <label class="form-check-label" for="inlineRadio1" >Single Camera</label>
            </div>
            <div class="form-check form-check-inline" >
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Dual Camera" />
              <label class="form-check-label" for="inlineRadio2">Dual Camera</label>
            </div>
          </div>
          <div onChange={this.onChangeDrons}>
            <label >Drons :</label>
            <div class="form-check form-check-inline" >
              <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" value="Yes" />
              <label class="form-check-label" for="inlineRadio1" >Yes</label>
            </div>
            <div class="form-check form-check-inline" >
              <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" value="No" />
              <label class="form-check-label" for="inlineRadio2">No</label>
            </div>
          </div>
          <div className="form-group">
            <label>Amount (in LKR): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Package" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}