import React, { Component } from 'react';
import { Link } from 'react-router'

class ConcertIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concerts: []
    };
  }

  fetchConcerts() {
    fetch(`/api/v1/concerts`)
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
      this.setState({ concerts: data })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    };

    componentDidMount(){
      this.fetchConcerts()
    }


  render() {
    let concert = this.state.concerts.map(concert => {
      return (
        <div key={concert.id} className="band-card grid-x grid-margin-x">
          <div className="cell small-12">
            <p>{concert.title}</p>
            <p>{concert.location}</p>
            <p>{concert.booker}</p>
          </div>
        </div>
      )
    })
    return (
      <div>
        {concert}
      </div>
    )
  }
}
export default ConcertIndexPage;
