import React, { Component } from 'react';
import { Link } from 'react-router'


class BandIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      user: null
    };
    this.fetchBandsAndUser = this.fetchBandsAndUser.bind(this)
  }

  fetchBandsAndUser() {
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
    .then(data => {
      this.setState({
        bands: data.bands,
        user: data.user
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.fetchBandsAndUser()
  }

  render() {
    let createBandButton = null
    let createBookerButton = null

    let user = this.state.user

    if (user !== null) {
      if (!user.has_band) {
        createBandButton = (
          <button className="create-band">
            <Link to={'/band/new'}>Make a Band</Link>
          </button>
        )
      }

      if (!user.has_booker) {
        createBookerButton = (
          <button className="create-band">
            <Link to={'/booker/new'}>Make a Booker</Link>
          </button>
        )
      }
    }

    let bands = this.state.bands.map(band => {
      return(
        <div key={band.id} className="band-card">
          <div className="cell small-12">
            <img className="band-promo-image-index" src={band.band_image} />
          </div>
          <div className="cell small-12">
            <h3><Link to={`/bands/${band.id}`}>{band.band_name}</Link></h3>
            <p className="band-bio">{band.band_bio}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="create-booker-and-band-div">
        <div>
          {createBandButton}
          {createBookerButton}
        </div>
        <h2 className="band-title">Bands</h2>
        {bands}
      </div>
    )
  }
}
export default BandIndex;
