import React, { Component } from 'react';
import BookerForm from "../components/BookerForm"

import { browserHistory } from 'react-router';


class NewBookerPage extends Component {
  constructor(props) {
    super(props);
    this.addNewBooker = this.addNewBooker.bind(this)
  }

  addNewBooker(formPayload){
    let jsonStringInfo = JSON.stringify(formPayload)
    fetch(`/api/v1/bookers`, {
      method: 'POST',
      body: jsonStringInfo,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(response => {
      browserHistory.push(`/`)
    })
  }

  render() {
    return (
      <div className='form-div'>
        <h1 className='form-title'>Create a Booker</h1>
        <BookerForm handleSubmit={this.addNewBooker} />
      </div>
    )
  }
}
export default NewBookerPage;
