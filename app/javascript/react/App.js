import React from 'react'
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import SpotterIndex from './pages/SpotterIndex'
import SpotterShowPage from './pages/SpotterShowPage'

export const App = (props) => {
  return (
  <Router history={browserHistory}>
    <Route path="/" component={SpotterIndex}/>
    <Route path="/bands/:id" component={SpotterShowPage}/>
  </Router>
  )
}

export default App
