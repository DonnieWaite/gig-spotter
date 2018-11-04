import React, { Component } from 'react';
import { Link } from 'react-router'

class BookerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookers: []
    };
    this.fetchBookers = this.fetchBookers.bind(this)
  }

  fetchBookers() {
    fetch(`/api/v1/bookers`)
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
      let bookers = data.bookers
      this.setState({ bookers: bookers })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    };

    componentDidMount(){
      this.fetchBookers()
    }


  render() {
    let booker = this.state.bookers.map(booker => {
      return (
        <div key={booker.id} className="band-card grid-x grid-margin-x">
          <div className="cell small-12">
            <img className="band-promo-image-index" src={booker.booker_image} />
          </div>
          <div className="cell small-12">
            <h3><Link to={`/bookers/${booker.id}`}>{booker.organization_name}</Link></h3>
            <p>{booker.booker_bio}</p>
          </div>
        </div>
      )
    })
    return (
      <div>
      {booker}
      </div>
    )
  }
}
export default BookerIndex;
