import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import PackagesList from "./components/packages-list.component";
import CreateExercise from "./components/create-package.component";
import CreateUser from "./components/create-user.component";
import SelectPackage from "./components/select-package.component";
import EditPackage from './components/edit-package.component';
/**My Notes Components */
import MyNotes from "./components/mynotes.component";
import EditNote from "./components/edit-note.component";
import CreateNote from "./components/create-note.component";
import SingleView from "./components/single-view.component";
/**Booking components */
import BookingsList from "./components/bookings-list.component";
import EditBooking from "./components/edit-booking.component";
import CreateBooking from "./components/create-booking.component";



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      
      <br/>
      <div style={{paddingTop:'300px'}}>
      <Route path="/" exact component={PackagesList} />
      <Route path="/edit/:id" component={EditPackage} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/select/:id" component={SelectPackage} />
      
      <Route path="/notes" exact component={MyNotes} />
      <Route path="/Nedit/:id" exact component={EditNote} />
      <Route path="/Ncreate" exact component={CreateNote} />
      <Route path="/single/:id" exact component={SingleView}/>

      <Route path="/bookings" exact component={BookingsList} />
      <Route path="/Bedit/:id" component={EditBooking} />
      <Route path="/Bcreate" component={CreateBooking} />

      </div>
      </div>
    </Router>
  );
}

export default App;
