import React, { Component } from 'react';
import { Link } from "react-router"
import ConcertTile from '../components/ConcertTile'

import moment from "moment";

class BookerShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booker: {},
      concerts: []
    };
  }

  componentDidMount() {
    fetch(`/api/v1/bookers/${this.props.params.bookerId}`)
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
      let booker = data.booker
      let concert = data.concerts
      this.setState({
        booker: booker,
        concerts: concert
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let concerts = this.state.concerts.map(concert => {
      return <ConcertTile key={concert.id} concert={concert}/>
    })

    let concertsSection = (
      <h5 className="band-title center">This booker hasn't booked any concerts</h5>
    )

    if (concerts.length > 0) {
      concertsSection = (
        <div>
          <h3 className="band-title center">Shows</h3>
          {concerts}
        </div>
      )
    }

    return (
      <div>
        <div className="band-card grid-x grid-margin-x">
          <div className="cell small-24">
            <h1 className="band-show-page-title">{this.state.booker.organization_name}</h1>
          </div>
          <div className="cell small-24 large-14">
            <img src={this.state.booker.booker_image} width="500" height="500"/>
          </div>
          <div className="cell small-24 large-10 grid-y">
            <p className="band-attribute"><span className="band-attribute-title">{this.state.booker.booker_name}</span> {this.state.booker.booker_bio}</p>
          </div>
        </div>
        {concertsSection}
      </div>
    )
  }
}
export default BookerShowPage;
