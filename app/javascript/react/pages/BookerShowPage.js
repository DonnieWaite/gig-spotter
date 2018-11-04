import React, { Component } from 'react';


class BookerShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookerInfo: []
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
      let booker = data[0]
      this.setState({ bookerInfo: booker })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {

    return (
      <div>
        <div className="game-show-page grid-x grid-margin-x">
          <div className="cell small-24">
            <h1 className="game-show-page-title">{this.state.bookerInfo.organization_name}</h1>
          </div>
          <div className="cell small-24 large-14">
            <img src={this.state.bookerInfo.booker_image} width="500" height="500"/>
          </div>
          <div className="cell small-24 large-10 grid-y">
            <p className="game-attribute"><span className="game-attribute-title">{this.state.bookerInfo.booker_name}</span> {this.state.bookerInfo.booker_bio}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default BookerShowPage;
