import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class BookerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookerName: props.bookerName,
      bookerBio: props.bookerBio,
      bookerImage: props.bookerImage,
    };
    this.handleBookerNameChange = this.handleBookerNameChange.bind(this)
    this.handleBookerBioChange = this.handleBookerBioChange.bind(this)
    this.handleBookerImageChange = this.handleBookerImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBookerNameChange(event) {
    this.setState({ bookerName: event.target.value})
  }


  handleBookerBioChange(event) {
    this.setState({ bookerBio: event.target.value})
  }

  handleBookerImageChange(event) {
    this.setState({ bookerImage: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      organization_name: this.state.bookerName,
      booker_bio: this.state.bookerBio,
      booker_image: this.state.bookerImage,
    }
    this.props.handleSubmit(formPayload)
  }


  render() {
    return (
      <form className='form' onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <label>Booking Name
          <input
            label="Booking Name"
            name="booker_name"
            type='text'
            value={this.state.bookerName}
            onChange={this.handleBookerNameChange}
          />
        </label>
        <label>Bio
          <input
            label="Booker Bio"
            name="booker_bio"
            type='text'
            value={this.state.bookerBio}
            onChange={this.handleBookerBioChange}
          />
        </label>
        <label>Image url
          <input
            label="Image url"
            name="booker_image"
            type='text'
            value={this.state.bookerImage}
            onChange={this.handleBookerImageChange}
          />
        </label>

        <div className="button-group">

          <input className="button" type="submit" value="Submit"/>
        </div>
      </form>
    )
  }
}
export default BookerForm;
