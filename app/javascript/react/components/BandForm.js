import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class BandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: props.bandName,
      bandBio: props.bandBio,
      bandImage: props.bandImage,
      bandCampUrl: props.bandcampUrl,
      genre: props.genre
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
        <label>Band Name
          <input
            label="Band Name"
            name="band_name"
            type='text'
            value={this.state.bandName}
            onChange={this.handleBandNameChange}
          />
        </label>
        <label>Bio
          <input
            label="Band Bio"
            name="band_bio"
            type='text'
            value={this.state.bandBio}
            onChange={this.handleBandBioChange}
          />
        </label>
        <label>Image url
          <input
            label="Image url"
            name="band_image"
            type='text'
            value={this.state.bandImage}
            onChange={this.handleBandImageChange}
          />
        </label>
        <label>Bandcamp url
          <input
            label="Bandcamp url"
            name="bandcamp_url"
            type='text'
            value={this.state.bandCampUrl}
            onChange={this.handleBandCampUrlChange}
          />
        </label>
        <label>Genre
          <input
            label="Genre"
            name="genre"
            type='text'
            value={this.state.genre}
            onChange={this.handleGenreChange}
          />
        </label>


        <div className="button-group">
          <button className="button" onClick={() => this.props.handleDelete(this.props.bandId)}>Delete</button>
          <input className="button" type="submit" value="Submit"/>
        </div>
      </form>
    )
  }
}
export default BandForm;
