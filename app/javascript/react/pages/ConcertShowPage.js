import React, { Component } from 'react';
import { Link } from "react-router"
import moment from "moment";


class ConcertShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {},
      bandsPlaying: [],
      bandsToSelect: [],
      booker: {},
      newListing: {},
      canUserEdit: false,
      selectedBandId: ""
    };
    this.fetchConcert = this.fetchConcert.bind(this)
    this.fetchBandsToSelect = this.fetchBandsToSelect.bind(this)
    this.handleChangeSelectedBand = this.handleChangeSelectedBand.bind(this)
    this.handleSubmitNewBand = this.handleSubmitNewBand.bind(this)
  }

  fetchConcert() {
    return fetch(`/api/v1/concerts/${this.props.params.concertId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let concert = data.concert
      let bands = data.bands
      let booker = data.booker
      let can_user_edit = data.can_user_edit
      this.setState({
        concert: concert,
        bandsPlaying: bands,
        booker: booker,
        canUserEdit: can_user_edit
      })
      return data
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChangeSelectedBand(event) {
    this.setState({ selectedBandId: event.target.value })
  }

  fetchBandsToSelect() {
    fetch(`/api/v1/bands`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      this.setState({ bandsToSelect: response.bands }, () => console.log(response.bands))
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  componentDidMount() {
    this.fetchConcert()
    this.fetchBandsToSelect()
  }

  handleSubmitNewBand(e) {
    e.preventDefault()
    let requestBody = JSON.stringify({ band_id: this.state.selectedBandId })
    fetch(`/api/v1/concerts/${this.props.params.concertId}/add_band`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      this.setState({
        bandsPlaying: this.state.bandsPlaying.concat(response.band)
      })
    })
  }

  render() {
    let dateAndTime = moment(this.state.concert.date_and_time).format('MMMM Do YYYY, h:mm a')

    let bandsPlaying = this.state.bandsPlaying.map(band => {
      return (
        <li key={band.id}>
          <Link to={`/bands/${band.id}`}>{band.band_name}</Link>
        </li>
      )
    })

    let bandIdsPlayingConcert = this.state.bandsPlaying.map(band => band.id)
    let nonDuplicateBands = this.state.bandsToSelect.filter(band => {
      return !bandIdsPlayingConcert.includes(band.id)
    })

    let addBandToConcertForm = () => (
      <form className='form-div' onSubmit={this.handleSubmitNewBand}>
        <select value={this.state.selectedBandId} name="band_id" onChange={this.handleChangeSelectedBand}>
          <option disabled selected value=""> -- select a band -- </option>
          {nonDuplicateBands.map(band => {
            return(<option key={band.id} value={band.id}>{band.band_name}</option>)
          })}
        </select>
        <input className="button" type="submit" value="Add Band!"/>
      </form>
    )


    return (
      <div className='grid-x grid-margin-x small-10 small-centered columns center large-6 columns center'>
        <div className="center">
          <h1>{this.state.concert.title}</h1>
        </div>
        <div className='concert-details'>
          <p>{this.state.concert.description}</p>
          <p>{dateAndTime}</p>
          <p>{this.state.concert.location}</p>
        </div>
        <div className='large-4 columns center'>
          <h2 className='band-title center'>Bands</h2>
          <ul className='center'>
            {bandsPlaying}
          </ul>
        </div>
        {this.state.canUserEdit ? addBandToConcertForm() : null}
        <div>
          <Link to={`/bookers/${this.state.booker.id}`}>
            <h3 className='band-title'>Booked by: {this.state.booker.organization_name}</h3>
          </Link>
        </div>
      </div>
    )
  }
}
export default ConcertShowPage;
