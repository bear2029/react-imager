import _ from 'lodash'
import React from 'react'
import Imager from '../components/Imager'
import { storiesOf, action } from '@kadira/storybook'
storiesOf('basic', module)
  .add('load successfully', () => {
    return (
      <Imager
        src="http://fooding.hmgcdn.com/images/article/102659/a102659_108112_1431057831.jpg"
        onLoaded={ action('loaded') }
      />
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
