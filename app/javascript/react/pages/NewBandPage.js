import React, { Component } from 'react';
import BandForm from "../components/BandForm"

import { browserHistory } from 'react-router';


class NewBandPage extends Component {
  constructor(props) {
    super(props);
    this.addNewBand = this.addNewBand.bind(this)
  }

  addNewBand(formPayload){
    let jsonStringInfo = JSON.stringify(formPayload)
    fetch(`/api/v1/bands`, {
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
        <h1 className='form-title'>Create a Band</h1>
        <BandForm handleSubmit={this.addNewBand} />
      </div>
    )
  }
}
export default NewBandPage;
