import React, { Component } from 'react';
import { Link } from 'react-router'


class BandIndex extends Component {
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
            <h3><Link to={`/bands/${band.id}`}>{band.band_name}</Link></h3>
            <p>{band.band_bio}</p>
          </div>
        </div>
      )
    })
    return (

      <div>
      <h4><Link to={'/bookers/new'}>Make a Booker</Link></h4>
      <h4><Link to={'/bands/new'}>Make a Band</Link></h4>
      {bands}
      </div>
    )
  }
}
export default BandIndex;
