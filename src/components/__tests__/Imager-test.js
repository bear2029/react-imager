jest.disableAutomock()
import _ from 'lodash'
import Imager, { getRestrictedClass } from '../Imager'
import React from 'react'
import { render, shallow, mount } from 'enzyme'
describe('imager', () => {
  var wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Imager
        src="bbb"
        className="foo bar"
      />
    )
  })
  it('basically works', () => {
    expect(wrapper.find('span').hasClass('react-imager')).toBe(true)
    expect(wrapper.find('span').hasClass('loading')).toBe(true)
    expect(wrapper.find('span').hasClass('foo')).toBe(true)
    expect(wrapper.find('span').hasClass('bar')).toBe(true)
    expect(_.get(wrapper.find('span figure').prop('style'), 'backgroundImage')).toEqual('url(bbb)')
  })
  it('handle loaded', () => {
    wrapper.find('span img').simulate('load')
    expect(wrapper.find('span').hasClass('loaded')).toBe(true)
  })
  it('handle failure', () => {
    wrapper.find('span img').simulate('error', {})
    expect(wrapper.find('span').hasClass('failed')).toBe(true)
  })
})
