import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messaging from './pages/Messaging';
import History from './pages/History';
import Donation from './pages/Donor';
import Reception from './pages/Receiver';
import Login from './Login'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/donation' component={Donation} />
          <Route path='/reception' component={Reception} />
          <Route path='/messaging' component={Messaging} />
          <Route path='/history' component={History} />
        </Switch>
      </Router>

      {/* <Login/> */}
      
    </>
  );
}

export default App;