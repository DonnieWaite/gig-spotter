import React, { Component } from 'react';
import moment from "moment";

class BookerShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookerInfo: [],
      concerts: []
    };
  }

  componentDidMount() {
    fetch(`/api/v1/bookers/${this.props.params.id}`)
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
      this.setState({ bookerInfo: booker })
      this.setState({ concerts: concert})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let concert = this.state.concerts.map(concert => {
      let dateAndTime = moment(concert.date_and_time).format('MMMM Do YYYY, h:mm:ss a')
      return(
        <div className="band-show-page grid-x grid-margin-x" id={concert.id}>
          <div className="cell small-24">
            <h1 className="">{concert.title}</h1>
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
      <div>
        <div className="band-card grid-x grid-margin-x">
          <div className="cell small-24">
            <h1 className="band-show-page-title">{this.state.bookerInfo.organization_name}</h1>
          </div>
          <div className="cell small-24 large-14">
            <img src={this.state.bookerInfo.booker_image} width="500" height="500"/>
          </div>
          <div className="cell small-24 large-10 grid-y">
            <p className="band-attribute"><span className="band-attribute-title">{this.state.bookerInfo.booker_name}</span> {this.state.bookerInfo.booker_bio}</p>
          </div>
        </div>
        <h3 className="band-title">Shows</h3>
        {concert}
      </div>
    )
  }
}
export default BookerShowPage;
