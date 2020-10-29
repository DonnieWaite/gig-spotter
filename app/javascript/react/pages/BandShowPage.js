import React, { Component } from 'react';
import { Link } from 'react-router'
import moment from "moment";
import ConcertTile from '../components/ConcertTile'

class BandShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandInfo: [],
      concerts: [],
      user: [],
      currentUser: []
    };
    this.fetchBand = this.fetchBand.bind(this)
  }

  fetchBand(){
    fetch(`/api/v1/bands/${this.props.params.bandId}`)
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
      let currentUser = data.current_user
      let band = data.band
      let concert = data.concerts
      let user = data.user
      this.setState({
        bandInfo: band,
        concerts: concert,
        user: user,
        currentUser: currentUser
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };
  

  componentDidMount(){
  this.fetchBand()
}

  render() {
    let editBandLink = ""
    if (this.state.currentUser !== null && this.state.currentUser.id === this.state.user.id) {
      editBandLink = <Link to={`/band/${this.props.params.bandId}/edit`}>Edit band</Link>
    }
    let concerts = this.state.concerts.map(concert => {
      return <ConcertTile key={concert.id} concert={concert} />
    })

    let concertsDiv = (
      <div className="center">
        <h5 className="band-title">This band has no concerts yet</h5>
        <button className="create-event-button center margin-top-md"><Link to={'/concert/new'}>Create Event</Link></button>
      </div>
    )

    if (concerts.length > 0) {
      concertsDiv = (
        <div className="center">
          <h3 className="band-title">Shows</h3>
          {concerts}
          <button className="create-event-button center margin-top-md"><Link to={'/concert/new'}>Create Event</Link></button>
        </div>
      )
    }

    return (
      <div>
        {editBandLink}
        <div className="band-show-page padding-bottom-md grid-x grid-margin-x">
          <div className="cell small-24">
            <h1 className="band-title">{this.state.bandInfo.band_name}</h1>
          </div>
          <div className="cell small-24 large-14">
            <img src={this.state.bandInfo.band_image} width="500" height="500"/>
          </div>
          <div className="cell width-full margin-top-sm center small-24 large-10 grid-y">
            <p className="band-attribute center"><span className="band-attribute-title"></span> {this.state.bandInfo.band_bio}</p>
            <p className="band-attribute center"><span className="band-attribute-title"></span> {this.state.user.email}</p>
            <a href={this.state.bandInfo.bandcamp_url} className="band-attribute"><span className="game-attribute-title"></span> {this.state.bandInfo.bandcamp_url}</a>
          </div>
        </div>
        {concertsDiv}
      </div>
    )
  }
}
export default BandShowPage;
