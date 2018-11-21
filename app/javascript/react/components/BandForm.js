import React, { Component } from 'react';
import BandNameField from '../components/BandNameField'
import BandBioField from '../components/BandBioField'
import BandImageField from '../components/BandImageField'
import BandCampUrlField from '../components/BandCampUrlField'
import GenreField from '../components/GenreField'

import { browserHistory } from 'react-router';


class BandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      bandBio: '',
      bandImage: '',
      bandCampUrl: '',
      genre: ''
    };
    this.handleBandNameChange = this.handleBandNameChange.bind(this)
    this.handleBandBioChange = this.handleBandBioChange.bind(this)
    this.handleBandImageChange = this.handleBandImageChange.bind(this)
    this.handleBandCampUrlChange = this.handleBandCampUrlChange.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBandNameChange(event) {
    this.setState({ bandName: event.target.value})
  }

  handleBandCampUrlChange(event) {
    this.setState({ bandCampUrl: event.target.value})
  }

  handleGenreChange(event) {
    this.setState({ genre: event.target.value})
  }

  handleBandBioChange(event) {
    this.setState({ bandBio: event.target.value})
  }

  handleBandImageChange(event) {
    this.setState({ bandImage: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      band_name: this.state.bandName,
      band_bio: this.state.bandBio,
      band_image: this.state.bandImage,
      bandcamp_url: this.state.bandCampUrl,
      genre: this.state.genre
    }
    this.props.handleSubmit(formPayload)
  }


  render() {
    return (
      <form className='form' onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <BandNameField
          bandName={this.props.bandName}
          content={this.state.bandName}
          label="Band Name"
          name="band_name"
          id={this.state.id}
          handleBandNameChange={this.handleBandNameChange}
        />
        <BandBioField
          content={this.state.bandBio}
          label="Bio"
          name="booker_bio"
          id={this.state.id}
          handleBandBioChange={this.handleBandBioChange}
        />
        <BandImageField
          content={this.state.bandImage}
          label="Image url"
          name="band_image"
          id={this.state.id}
          handleBandImageChange={this.handleBandImageChange}
        />
        <BandCampUrlField
          content={this.state.bandCampUrl}
          label="Bandcamp Url"
          name="bandcamp_url"
          id={this.state.id}
          handleBandCampUrlChange={this.handleBandCampUrlChange}
        />
        <GenreField
          content={this.state.genre}
          label="Genre"
          name="genre"
          id={this.state.id}
          handleGenreChange={this.handleGenreChange}
        />

        <div className="button-group">

          <button className="button">Clear</button>
          <input className="button" type="submit" value="Submit"/>
        </div>
      </form>
    )
  }
}
export default BandForm;
