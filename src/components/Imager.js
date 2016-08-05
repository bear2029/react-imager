import React, { PropTypes, PureComponent } from 'react'
import _ from 'lodash'

const IMAGER_PROPTYPES = {
  className: PropTypes.string,
  height: PropTypes.number,
  onFailed: PropTypes.func,
  onLoaded: PropTypes.func,
  src: PropTypes.string.isRequired,
  width: PropTypes.number
}
export default class Imager extends PureComponent {
  constructor(props){
    super(props)
    _.bindAll(this, 'onLoaded')
    this.state = {
      loaded: false,
      error: undefined
    }
    let img = new Image()
    img.addEventListener("error", e => this.onFailed(e))
    img.addEventListener("load", e => {
      this.onLoaded(e, img.width, img.height)
    })
    img.src = this.props.src
  }
  onLoaded(e, width, height){
    if(_.isFunction(this.props.onLoaded)) this.props.onLoaded(e, { width, height })
    this.setState({ loaded: true })
  }
  onFailed(e){
    if(_.isFunction(this.props.onFailed)) this.props.onFailed(e)
    this.setState({ error: e })
  }
  render(){
    let mainStyle, imgStyle, imgClass = ''
    if(this.state.loaded){
      imgClass += ' loaded'
    }else if(this.state.error){
      imgClass += ' failed'
    }else{
      imgStyle = {
        position: 'absolute',
        visibility: 'hidden',
        top: 0,
        left: 0
      }
      mainStyle = {
        position: 'relative'
      }
    }
    return (
      <span
        style={ mainStyle }
        className={ `react-imager this.props.className` }
      >
        <img
          src={ this.props.src }
          style={ imgStyle }
          className={ imgClass }
          onLoad={ this.onLoaded }
        />
      </span>
    )
  }
}
Imager.propTypes = IMAGER_PROPTYPES
