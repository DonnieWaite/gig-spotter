import React, { Component } from 'react';
import ConcertTitleField from '../components/ConcertTitleField'
import ConcertDescriptionField from '../components/ConcertDescriptionField'
import ConcertLocationField from '../components/ConcertLocationField'


import { browserHistory } from 'react-router';


class NewConcertPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concerts: [],
      concertTitle: '',
      concertLocation: '',
      concertDescription: '',
      band: [],
      bands: [],
      concerts: [],
      booker: [],
      bookers: [],
      date: '',
      time: '',
      bandId: '',
      bookerId: ''
    };
    this.fetchBands = this.fetchBands.bind(this)
    this.fetchBookers = this.fetchBookers.bind(this)
    this.addNewConcert = this.addNewConcert.bind(this)
    this.handleConcertTitleChange = this.handleConcertTitleChange.bind(this)
    this.handleConcertDescriptionChange = this.handleConcertDescriptionChange.bind(this)
    this.handleConcertLocationChange = this.handleConcertLocationChange.bind(this)
    this.handleBandChange = this.handleBandChange.bind(this)
    this.handleBookerChange = this.handleBookerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
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

    addNewConcert(formPayload){
    let jsonStringInfo = JSON.stringify(formPayload)
    fetch('/api/v1/concerts', {
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
        concerts: this.state.concerts.concat(formPayload)
      })
      browserHistory.push(`/`)
    })
    }



  handleConcertTitleChange(event) {
    this.setState({ concertTitle: event.target.value})
  }

  handleConcertDescriptionChange(event) {
    this.setState({ concertDescription: event.target.value})
  }

  handleConcertLocationChange(event) {
    this.setState({ concertLocation: event.target.value})
  }

  handleBandChange(event) {
    this.setState({ bandId: event.target.value})
  }

  handleBookerChange(event) {
    this.setState({ bookerId: event.target.value})
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value})
  }

  handleTimeChange(event) {
    this.setState({ time: event.target.value})
  }


  componentDidMount() {
    this.fetchBands()
    this.fetchBookers()
  }

  handleSubmit(event) {
  event.preventDefault()
  let formPayload = {
    title: this.state.concertTitle,
    description: this.state.concertDescription,
    location: this.state.concertLocation,
    booker_id: this.state.bookerId,
    date: this.state.date,
    time: this.state.time,
    band_id: this.state.bandId
    }
    this.addNewConcert(formPayload)
  }



    render() {
      let bookers = this.state.bookers.map(booker => {
        return(
          <option id={booker.id} value={booker.id}>{booker.organization_name}</option>
        )
      })
      let bands = this.state.bands.map( band => {
        return(
              <option id={band.id} value={band.id}>{band.band_name}</option>

        )
      })
      return (
        <div className='form-div'>
          <h1 className='form-title'>Create A Concert!</h1>
          <form className='form' onSubmit={this.handleSubmit}>
            <ConcertTitleField
              content={this.state.title}
              label="Title"
              name="title"
              id="title"
              handleConcertTitleChange={this.handleConcertTitleChange}
            />
            <ConcertDescriptionField
              content={this.state.description}
              label="Description"
              name="description"
              id="description"
              handleConcertDescriptionChange={this.handleConcertDescriptionChange}
            />
            <ConcertLocationField
              content={this.state.location}
              label="Location"
              name="location"
              id="location"
              handleConcertLocationChange={this.handleConcertLocationChange}
            />

            <select value={this.state.bandId} name="band_id" onChange={this.handleBandChange}>
            <option disabled selected value> -- select a band -- </option>
            {bands}
            </select>

            <select value={this.state.bookerId} name="booker_id" onChange={this.handleBookerChange}>
            <option disabled selected value> -- select a booker -- </option>
              {bookers}
            </select>

            <input value={this.state.date} type="date"  onChange={this.handleDateChange}/>

            <input value={this.state.time} type="time" onChange={this.handleTimeChange}/>

            <div className="button-group">

              <button className="button">Clear</button>
              <input className="button" type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      )
    }
  }
export default NewConcertPage;
