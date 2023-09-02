import React, { Component } from 'react'
import spin from './loading.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className='my-5' src={spin} alt="spinner" />
      </div>
    )
  }
}
