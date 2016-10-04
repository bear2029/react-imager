import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
const RESTRICT_CLASS_VERTICAL = 'restrict-v'
const RESTRICT_CLASS_HORIZONTAL = 'restrict-h'

const IMAGER_PROPTYPES = {
  className: PropTypes.string,
  failedClass: PropTypes.string,
  loadedClass: PropTypes.string,
  loadingClass: PropTypes.string,
  onFailed: PropTypes.func,
  onLoaded: PropTypes.func,
  src: PropTypes.string.isRequired,
}
const IMAGER_DEFAULT_PROPS = {
  className: '',
  failedClass: 'fail',
  loadingClass: 'loading',
  loadedClass: 'loaded'
}
export default class Imager extends Component {
  constructor(props){
    super(props)
    _.bindAll(this, 'onLoaded', 'onFailed')
    this.state = {
      loaded: false,
      error: undefined
    }
  }
  onLoaded(e){
    this.setState({ loaded: true })
    if(_.isFunction(this.props.onLoaded)) {
      this.props.onLoaded(e)
    }
  }
  onFailed(e){
    if(_.isFunction(this.props.onFailed)) this.props.onFailed(e)
    this.setState({ error: e })
  }
  render(){
    let mainStyle = {}, imgStyle = {}, mainClass = ''
    imgStyle.backgroundImage = `url(${this.props.src})`
    if(this.state.loaded){
      mainClass += ' loaded'
    }else if(this.state.error){
      mainClass += ' failed'
    }else{
      mainClass += ' loading'
    }
    return (
      <span
        className={ `react-imager ${this.props.className} ${mainClass}` }
        style={ mainStyle }
      >
        { this.state.loaded || this.state.error ? undefined : (
          <img
            src={ this.props.src }
            onLoad={ this.onLoaded }
            onError={ this.onFailed }
          />
        ) }
        <figure
          style={ imgStyle }
        />
      </span>
    )
  }
}
Imager.propTypes = IMAGER_PROPTYPES
Imager.defaultProps = IMAGER_DEFAULT_PROPS
