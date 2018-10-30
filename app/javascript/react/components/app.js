import React from 'react'
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import SpotterIndex from './SpotterIndex'

export const App = (props) => {
  return (
  <Router history={browserHistory}>
    <Route path="/" component={SpotterIndex}/>
  </Router>
  )
}

export default App
