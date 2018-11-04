import React, { Component } from 'react';


class BandShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandInfo: []
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
      debugger
      let band = data[0]
      this.setState({ bandInfo: band })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  componentDidMount(){
  this.fetchBand()
}

  render() {
    return (
      <div className="game-show-page grid-x grid-margin-x">
        <div className="cell small-24">
          <h1 className="game-show-page-title">{this.state.bandInfo.band_name}</h1>
        </div>
        <div className="cell small-24 large-14">
          <img src={this.state.bandInfo.band_image} width="500" height="500"/>
        </div>
        <div className="cell small-24 large-10 grid-y">
          <p className="game-attribute"><span className="game-attribute-title">{this.state.bandInfo.band_name}</span> {this.state.bandInfo.band_bio}</p>
        </div>
      </div>
    )
  }
}
export default BandShowPage;
