import _ from 'lodash'
import React from 'react'
import Imager from '../components/Imager'
import { storiesOf, action } from '@kadira/storybook'
import  Highlight from 'react-highlight'
import '../scss/imagr-theme.scss'
storiesOf('basic', module)
  .add('load successfully', () => {
    return (
      <div>
        <Imager
          src="http://image.shutterstock.com/z/stock-photo-grandmother-with-mother-and-daughter-against-the-lake-144816268.jpg"
          onLoaded={ action('loaded') }
        />
      </div>
    )
  })
  .add('fail to load', () => {
    return (
      <Imager
        src="http://www.yahoo.com/aa.jpg"
        onFailed={ action('loading failed') }
      />
    )
  })
storiesOf('width style', module)
  .add('load successfully', () => {
    return (
      <Imager
        src="http://image.shutterstock.com/z/stock-vector-healthy-vegetables-frame-linear-graphic-vector-illustration-253355536.jpg"
        onLoaded={ action('loaded') }
        className="imagr example"
      />
    )
  })
  .add('fail to load', () => {
    return (
      <Imager
        src="http://www.yahoo.com/aa.jpg"
        onFailed={ action('loading failed') }
        className="imagr example"
      />
    )
  })
  .add('crop square', () => {
    return (
        <Imager
          crop
          width={ 300 }
          height={ 300 }
          src="http://image.shutterstock.com/z/stock-vector-healthy-vegetables-frame-linear-graphic-vector-illustration-253355536.jpg"
          className="imagr"
        />
    )
  })
  .add('crop landscape', () => {
    return (
        <Imager
          crop
          width={ 300 }
          height={ 100 }
          src="http://image.shutterstock.com/z/stock-vector-healthy-vegetables-frame-linear-graphic-vector-illustration-253355536.jpg"
          className="imagr"
        />
    )
  })
  .add('crop portrait', () => {
    return (
        <Imager
          crop
          width={ 100 }
          height={ 300 }
          src="http://image.shutterstock.com/z/stock-vector-healthy-vegetables-frame-linear-graphic-vector-illustration-253355536.jpg"
          className="imagr"
        />
    )
  })
