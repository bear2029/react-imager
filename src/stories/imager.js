import _ from 'lodash'
import React from 'react'
import Imager from '../components/Imager'
import { storiesOf, action } from '@kadira/storybook'
import '../../style/scss/imagr-theme.scss'
import '../../style/scss/example.scss'
storiesOf('with style', module)
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
