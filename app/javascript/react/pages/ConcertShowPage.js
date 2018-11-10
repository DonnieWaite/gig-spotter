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
      newListing: {}
    };
    this.fetchConcert = this.fetchConcert.bind(this)
    this.fetchBandsToSelect = this.fetchBandsToSelect.bind(this)
  }

  fetchConcert() {
    return fetch(`/api/v1/concerts/${this.props.params.id}`)
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
        can_user_edit: can_user_edit
      })
      return data
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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

  componentDidUpdate() {
    console.log(this.state)
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

    // let addBandToConcertForm = (
    //   if this.state.can_user_edit the concert, render a little form with *only* a band dropdown
    //    submit with a new "add band" method that posts to "concerts/:concert_id/add_band" with the band_id in its payload
    // )

    return (
      <div className='row'>
        <div className='large-6 columns'>
          <h1>{this.state.concert.title}</h1>
        </div>
        <div className='concert-details medium-4 colums'>
          <p>{this.state.concert.description}</p>
          <p>{dateAndTime}</p>
          <p>{this.state.concert.location}</p>
        </div>
        <div className='larg-6 columns'>
          <h2 className='band-title'>Bands</h2>
          <ul>
            {bandsPlaying}
          </ul>
        </div>
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
