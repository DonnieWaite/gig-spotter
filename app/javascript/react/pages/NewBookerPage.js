import React, { Component } from 'react';
import OrganizationNameField from '../components/OrganizationNameField'
import BookerBioField from '../components/BookerBioField'
import BookerImageField from '../components/BookerImageField'
import { browserHistory } from 'react-router';


class NewBookerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookers: [],
      organizationName: '',
      bookerBio: '',
      bookerImage: ''
    };
    this.addNewBooker = this.addNewBooker.bind(this)
    this.handleOrganizationNameChange = this.handleOrganizationNameChange.bind(this)
    this.handleBookerBioChange = this.handleBookerBioChange.bind(this)
    this.handleBookerImageChange = this.handleBookerImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  addNewBooker(formPayload){
  let jsonStringInfo = JSON.stringify(formPayload)
  fetch(`/api/v1/bookers`, {
    method: 'POST',
    body: jsonStringInfo,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(formPayload => {
    this.setState({
      bookers: this.state.bookers.concat(formPayload)
    })
    browserHistory.push(`/bookers`)
  })
}

handleOrganizationNameChange(event) {
  this.setState({ organizationName: event.target.value})
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
  organization_name: this.state.organizationName,
  booker_bio: this.state.bookerBio,
  booker_image: this.state.bookerImage
  }
  this.addNewBooker(formPayload)
}



  render() {
    return (
      <div className='form-div'>
      <h1 className='form-title'>Create A Booker</h1>
      <form className='form' onSubmit={this.handleSubmit}>
        <OrganizationNameField
          content={this.state.organizationName}
          label="Organization Name"
          name="organization_name"
          id={this.state.id}
          handleOrganizationNameChange={this.handleOrganizationNameChange}
        />
        <BookerBioField
          content={this.state.bookerBio}
          label="Bio"
          name="booker_bio"
          id={this.state.id}
          handleBookerBioChange={this.handleBookerBioChange}
        />
        <BookerImageField
          content={this.state.bookerImage}
          label="Image url"
          name="booker_image"
          id={this.state.id}
          handleBookerImageChange={this.handleBookerImageChange}
        />

        <div className="button-group">

          <button className="button">Clear</button>
          <input className="button" type="submit" value="Submit"/>
        </div>
      </form>
      </div>
    )
  }
}
export default NewBookerPage;
