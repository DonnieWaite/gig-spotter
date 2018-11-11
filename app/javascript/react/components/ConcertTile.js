import React from 'react';
import { Link } from 'react-router'
import moment from 'moment'

const ConcertTile = (props) => {
  let dateAndTime = moment(props.concert.date_and_time).format('MMMM Do YYYY, h:mm a')
  return(
    <div key={props.concert.id} className="band-show-page grid-x grid-margin-x" id={props.concert.id}>
      <div className="cell small-24">
        <Link to={`/concerts/${props.concert.id}`}>
          <h1 className="">{props.concert.title}</h1>
        </Link>
      </div>
      <div className="cell small-24 large-14">
        <p>{props.concert.description} </p>
      </div>
      <div className="cell small-24 large-10 grid-y">
        <p className="band-attribute"><span className="band-attribute-title" >{dateAndTime}</span></p>
        <p>{props.concert.location}</p>
      </div>
    </div>
  )
}

export default ConcertTile;
