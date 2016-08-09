jest.disableAutomock()
import Imager, { getRestrictedClass } from '../Imager'
import React from 'react'
import { render, shallow, mount } from 'enzyme'
describe('getRestrictedClass', () => {
  it('portrait to landscape', () => {
    expect(getRestrictedClass(5,10, 100, 40)).toEqual({
      restrictedClass: 'restrict-v',
      offset: -80
    })
  })
  it('landscape to portrait', () => {
    expect(getRestrictedClass(500,10, 100, 400)).toEqual({
      restrictedClass: 'restrict-h',
      offset: -9950
    })
  })
})
describe('imager', () => {
  var wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Imager
        src="bbb"
        className="foo bar"
        width={ 200 }
        height={ 300 }
      />
    )
  })
  it('basically works', () => {
    expect(wrapper.find('span').hasClass('react-imager')).toBe(true)
    expect(wrapper.find('span').hasClass('loading')).toBe(true)
    expect(wrapper.find('span').hasClass('foo')).toBe(true)
    expect(wrapper.find('span').hasClass('bar')).toBe(true)
    expect(wrapper.find('span img').prop('src')).toEqual('bbb')
  })
  it('handle loaded', () => {
    wrapper.find('span img').simulate('load', {
      target: {
        naturalWidth: 200,
        naturalHeight: 300
      }
    })
    expect(wrapper.find('span').hasClass('loaded')).toBe(true)
  })
  it('handle failure', () => {
    wrapper.find('span img').simulate('error', {})
    expect(wrapper.find('span').hasClass('failed')).toBe(true)
  })
  it('handle crop', () => {
    wrapper.setProps({ crop: true })
    wrapper.find('span img').simulate('load', {
      target: {
        naturalWidth: 300,
        naturalHeight: 300
      }
    })
    expect(wrapper.hasClass('restrict-h')).toBe(true)
    expect(wrapper.find('img').prop('style').marginLeft).toEqual('-50px')
  })
})
