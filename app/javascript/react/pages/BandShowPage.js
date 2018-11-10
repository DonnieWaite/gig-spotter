import React, { Component } from 'react';
import { Link } from 'react-router'
import moment from "moment";

class BandShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandInfo: [],
      concerts: []
    };
    this.fetchBand = this.fetchBand.bind(this)
  }

  fetchBand(){
    fetch(`/api/v1/bands/${this.props.params.id}`)
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
      let band = data.band
      let concert = data.concerts
      this.setState({ bandInfo: band })
      this.setState( { concerts: concert})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  componentDidMount(){
  this.fetchBand()
}

  render() {
    let concert = this.state.concerts.map(concert => {
      let dateAndTime = moment(concert.date_and_time).format('MMMM Do YYYY, h:mm a')
      return(
      <div className="band-show-page grid-x grid-margin-x" id={concert.id}>
        <div className="cell small-24">
          <h1 className="band-show-page-title">{concert.title}</h1>
        </div>
        <div className="cell small-24 large-14">
          <p>{concert.description} </p>
        </div>
        <div className="cell small-24 large-10 grid-y">
          <p className="band-attribute"><span className="band-attribute-title" >{dateAndTime}</span></p>
          <p>{concert.location}</p>
        </div>
      </div>
    )
    })
    return (
      <div className="band-show-page grid-x grid-margin-x">
        <div className="cell small-24">
          <h1 className="band-title">{this.state.bandInfo.band_name}</h1>
        </div>
        <div className="cell small-24 large-14">
          <img src={this.state.bandInfo.band_image} width="500" height="500"/>
        </div>
        <div className="cell small-24 large-10 grid-y">
          <p className="band-attribute"><span className="band-attribute-title"></span> {this.state.bandInfo.band_bio}</p>
          <a href={this.state.bandInfo.bandcamp_url} className="band-attribute"><span className="game-attribute-title"></span> {this.state.bandInfo.bandcamp_url}</a>
        </div>
        <div>
          <h3 className="band-title">Shows</h3>
          {concert}
          <button className="create-event-button"><Link to={'/concert/new'}>Create Event</Link></button>
        </div>
      </div>
    )
  }
}
export default BandShowPage;
