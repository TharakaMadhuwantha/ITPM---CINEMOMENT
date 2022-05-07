import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const Package = props => (
  <tr>
    <td>{props.package.packagename}</td>
    <td>{props.package.packagetype}</td>
    <td>{props.package.amount}</td>
    <td>{props.package.description}</td>
    <td>
      <Link className="btn btn-outline-warning" to={"/select/"+props.package._id}><i className="fas fa-edit"></i>&nbsp;View</Link> | <a className="btn btn-outline-danger" href="#" onClick={() => { props.deletePackage(props.package._id) }}><i className="far fa-trash-alt"></i>&nbsp;Delete</a>
    </td>
  </tr>
)

export default class PackagesList extends Component {
  constructor(props) {
    super(props);

    this.deletePackage = this.deletePackage.bind(this)

    this.state = {packages: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5001/packages/')
      .then(response => {
        this.setState({ packages: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePackage(id) {
    axios.delete('http://localhost:5001/packages/'+id)
      .then(response => { console.log(response.data)});
      alert("Package details deleted successfully");

    this.setState({
      packages: this.state.packages.filter(el => el._id !== id)
    })
  }

  packageList() {
    return this.state.packages.map(currentpackage => {
      return <Package package={currentpackage} deletePackage={this.deletePackage} key={currentpackage._id}/>;
    })
  }

  handleSearchArea = (e) =>{

    const searchKey= e.currentTarget.value;
    console.log(searchKey);

    axios.get('http://localhost:5001/packages/')
      .then(response =>{     
        this.filterData(response.data,searchKey)
      })
      
        
  }

  filterData(packages,searchKey){
    const result = packages.filter((Package) =>
  
    Package.packagetype.toLowerCase().includes(searchKey) || Package.packagename.toLowerCase().includes(searchKey)

    )
    this.setState({packages:result})
  }

  exportPDF = () => {

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Packages";
    const headers = [['Package Name','Package type','Amount','Description']];
    const data = this.state.packages.map(elt=> [elt.packagename, elt.packagetype,elt.amount,elt.description]);
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Packages.pdf")

  }

  render() {
    return (
      <div>

          <div className="col-lg-3 mt-2 mb-2">
                  <input
                  className="form-control"
                  type="search"
                  placeholder="🔍 Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>
                  </input>
          </div>

        <h3>Packages</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Package Name</th>
              <th>Package type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.packageList() }
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