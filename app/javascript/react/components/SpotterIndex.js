import React, { Component } from 'react';


class SpotterIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: []
    };
    this.fetchBands = this.fetchBands.bind(this)
  }

  fetchBands() {
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
      this.setState({ bands: data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    };

    componentDidMount(){
      this.fetchBands()
    }


  render() {
    let bands = this.state.bands.map(band => {
      return(
        <div key={band.id} className="band-card grid-x grid-margin-x">
          <div className="cell small-12">
            <img className="band-promo-image-index" src={band.band_image} />
          </div>
          <div className="cell small-12">
            <h3><a href={band.bandcamp_url}>{band.band_name}</a></h3>
            <p>{band.band_name} {band.band_bio}</p>
          </div>
        </div>
      )
    })
    return (
      <div>
      {bands}
      </div>
    )
  }
}
export default SpotterIndex;
