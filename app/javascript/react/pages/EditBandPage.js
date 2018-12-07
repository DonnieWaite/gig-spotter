import React, { Component } from 'react';
import BandForm from "../components/BandForm"

import { browserHistory } from 'react-router';


class EditBandPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      band: {}
    }
    this.editBand = this.editBand.bind(this)
    this.getBand = this.getBand.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  getBand(){
    fetch(`/api/v1/bands/${this.props.params.bandId}`)
    .then(response => {
      if (response.ok) {
        return response;
      }else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then (data => {
      let band = data.band
      this.setState({ band: band })
    })
  }

  handleDelete(id){
    fetch(`/api/v1/bands/${this.props.params.bandId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
      ).then((response) => {
          console.log('Item was deleted!')
          browserHistory.push(`/`)
      })
  }


  editBand(formPayload){
    let jsonStringInfo = JSON.stringify(formPayload)
    fetch(`/api/v1/bands/${this.props.params.bandId}`, {
      method: 'Put',
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

componentDidMount() {
  this.getBand()
}

  render() {
    return (
      <div className='form-div'>
        <h1 className='form-title'>Edit {this.state.band.band_name} </h1>
        <BandForm
          bandId={this.state.band.id}
          genre={this.state.band.genre}
          bandImage={this.state.band.band_image}
          bancampUrl={this.state.band.bandcamp_url}
          bandBio={this.state.band.band_bio}
          bandName={this.state.band.band_name}
          handleSubmit={this.editBand}
          handleDelete={this.handleDelete}/>
      </div>
    )
  }
}
export default EditBandPage;
