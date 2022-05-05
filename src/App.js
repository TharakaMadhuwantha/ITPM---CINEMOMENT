import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import PackagesList from "./components/packages-list.component";
import CreateExercise from "./components/create-package.component";
import CreateUser from "./components/create-user.component";
import SelectPackage from "./components/select-package.component";
import EditPackage from './components/edit-package.component';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Route path="/" exact component={PackagesList} />
      <Route path="/edit/:id" component={EditPackage} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/select/:id" component={SelectPackage} />
      </div>
    </Router>
  );
}

export default App;
