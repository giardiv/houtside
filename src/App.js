
import './App.css';
import Homepage from './homepage';
import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Wall from './wall';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
          <Route path="/:node" children={<Wall />} />
        </Switch>
    </Router>
  );
}


export default App;

