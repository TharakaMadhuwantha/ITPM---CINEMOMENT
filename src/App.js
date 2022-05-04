import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import MyNotes from "./components/mynotes.component";
import EditNote from "./components/edit-note.component";
import CreateNote from "./components/create-note.component";
import UpdateUser from "./components/update-user.component";
import SingleView from "./components/single-view.component";
import UserProfile from "./components/user-account.component"
import Footer from "./components/footer.component";


function App() {
  return (
    <Router>
      <div>
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
        
       
        
        <div className="container">
          <Route path="root" exact component={Home}/>
          <Route path="/" exact component={MyNotes} />
          <Route path="/edit/:id" exact component={EditNote} />
          <Route path="/create" exact component={CreateNote} />
          <Route path="/update/:id" exact component={UpdateUser} />
          <Route path="/single/:id" exact component={SingleView}/>
          <Route path="/user" exact component={UserProfile}/>

        </div>
       
        <Footer/>
      </div>    
    </Router>
  );
}

export default App;
