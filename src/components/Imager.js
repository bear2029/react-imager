import React, { PropTypes, PureComponent } from 'react'
import _ from 'lodash'
const RESTRICT_CLASS_VERTICAL = 'restrict-v'
const RESTRICT_CLASS_HORIZONTAL = 'restrict-h'

const IMAGER_PROPTYPES = {
  className: PropTypes.string,
  crop: PropTypes.bool,
  failedClass: PropTypes.string,
  height: PropTypes.number,
  loadedClass: PropTypes.string,
  loadingClass: PropTypes.string,
  onFailed: PropTypes.func,
  onLoaded: PropTypes.func,
  src: PropTypes.string.isRequired,
  width: PropTypes.number
}
const IMAGER_DEFAULT_PROPS = {
  className: '',
  failedClass: 'fail',
  loadingClass: 'loading',
  loadedClass: 'loaded'
}
export default class Imager extends PureComponent {
  constructor(props){
    super(props)
    _.bindAll(this, 'onLoaded', 'onFailed')
    this.state = {
      loaded: false,
      error: undefined
    }
  }
  onLoaded(e){
    this.w = e.target.naturalWidth
    this.h = e.target.naturalHeight
    this.setState({ loaded: true })
    if(_.isFunction(this.props.onLoaded)) {
      this.props.onLoaded(e, {
        width: this.w,
        height: this.h
      })
    }
  }
  onFailed(e){
    if(_.isFunction(this.props.onFailed)) this.props.onFailed(e)
    this.setState({ error: e })
  }
  render(){
    let mainStyle = {}, imgStyle = {}, mainClass = ''
    if(this.state.loaded){
      mainClass += ' loaded'
      if(this.props.crop){
        if(!this.props.width || !this.props.height) {
          throw new Error('width & height is required from props when crop is expected')
        }
        const { restrictedClass, offset } = getRestrictedClass(
          this.w,
          this.h,
          this.props.width,
          this.props.height
        )
        mainClass += ` ${restrictedClass}`
        mainStyle.height = this.props.height
        mainStyle.width = this.props.width
        if(restrictedClass == RESTRICT_CLASS_HORIZONTAL){
          imgStyle.marginLeft = `${offset}px`
        }else{
          imgStyle.marginTop = `${offset}px`
        }
      }
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
        <img
          onError={ this.onFailed }
          onLoad={ this.onLoaded }
          src={ this.props.src }
          style={ imgStyle }
        />
      </span>
    )
  }
}
Imager.propTypes = IMAGER_PROPTYPES
Imager.defaultProps = IMAGER_DEFAULT_PROPS

export function getRestrictedClass(w, h, targetWidth, targetHeight){
  const ratioOriginal = w / h
  const ratioTarget = targetWidth / targetHeight
  if(ratioOriginal > ratioTarget){
    return {
      restrictedClass: RESTRICT_CLASS_HORIZONTAL,
      offset: (targetWidth - w * targetHeight / h) / 2
    }
  }else{
    return {
      restrictedClass: RESTRICT_CLASS_VERTICAL,
      offset: (targetHeight - h * targetWidth / w) / 2
    }
  }
}
