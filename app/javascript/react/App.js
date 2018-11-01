import React from 'react'
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';

import NavBar from './components/NavBar';
import BandIndex from './pages/BandIndex'
import BandShowPage from './pages/BandShowPage'
import BookerIndex from './pages/BookerIndex'
import BookerShowPage from './pages/BookerShowPage'
import EventShowPage from './pages/EventShowPage'
import NewEventPage from './pages/NewEventPage'

export const App = (props) => {
  return (
  <Router history={browserHistory}>
    <Route path='/' component={NavBar} >
      <IndexRoute component={BandIndex}/>
      <Route path="/bands/:id" component={BandShowPage}/>
      <Route path='/bookers' component={BookerIndex}/>
      <Route path='/bookers/:id' component={BookerShowPage}/>
      <Route path='/event/:id' component={EventShowPage}/>
      <Route path='/event/new' component={NewEventPage}/>
    </Route>
  </Router>
  )
}

export default App
