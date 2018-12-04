import React, { Component } from 'react';
import BookerForm from "../components/BookerForm"

import { browserHistory } from 'react-router';


class EditBookerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booker: {}
    }
    this.editBooker = this.editBooker.bind(this)
    this.getBooker = this.getBooker.bind(this)
  }

  getBooker(){
    fetch(`/api/v1/bookers/${this.props.params.bookerId}`)
    .then(response => {
      if (response.ok) {
        return response;
      }else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then (data => {
      let booker = data.booker
      this.setState({ booker: booker })
    })
  }

  editBooker(formPayload){
    let jsonStringInfo = JSON.stringify(formPayload)
    fetch(`/api/v1/bookers/${this.props.params.bookerId}`, {
      method: 'Put',
      body: jsonStringInfo,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(response => {
      debugger
      browserHistory.push(`/bookers`)
    })
  }

componentDidMount() {
  this.getBooker()
}

  render() {
    return (
      <div className='form-div'>
        <h1 className='form-title'>Edit {this.state.booker.booker_name} </h1>
        <BookerForm
          bookerImage={this.state.booker.booker_image}
          bookerBio={this.state.booker.booker_bio}
          bookerName={this.state.booker.booker_name}
          handleSubmit={this.editBooker} />
      </div>
    )
  }
}
export default EditBookerPage;
