import React, { Component } from 'react';
import { Link } from "react-router"
import moment from "moment";


class ConcertShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concert: {},
      bands: [],
      booker: {}
    };
  }

  componentDidMount() {
    fetch(`/api/v1/concerts/${this.props.params.id}`)
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
      this.setState({
        concert: concert,
        bands: bands,
        booker: booker
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let dateAndTime = moment(this.state.concert.date_and_time).format('MMMM Do YYYY, h:mm a')

    let bands = this.state.bands.map(band => {
      return (
        <li key={band.id}>
          <Link to={`/bands/${band.id}`}>{band.band_name}</Link>
        </li>
      )
    })

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
            {bands}
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
