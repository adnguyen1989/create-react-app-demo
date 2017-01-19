import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import FoodSearch from '~/src/components/FoodSearch'
import sinon from 'sinon';


describe('(Component) FoodSearch', () => {
  // ... initial state specs

  let wrapper;

  beforeEach(()=>{
    wrapper = shallow(<FoodSearch />)
  })

  it ("does not render the remove button", ()=>{
    expect(wrapper.find('.remove.icon').first().props().hidden).to.equal(true)
  })

  it ("renders an empty list", ()=>{
    expect(wrapper.find('#selectedResults tbody tr').length).to.equal(0)
  })

  describe('user populates search field', () => {
    const value = "brocc"

    beforeEach(() => {
      const input = wrapper.find('input#searchField').first();
      input.simulate('change', {
        target: { value: value }
      })

    });

    it ('updates the state filterText', ()=>{
      expect(wrapper.state().filterText).to.equal(value)
    })

    it ("renders the remove button", ()=>{
      expect(wrapper.find('.remove.icon').first().props().hidden).to.equal(false)
    })

    describe('and API returns results', () => {
      beforeEach(()=>{
        // ... simualte API returning results
      });

      // ... specs

      describe('then user clicks food item', ()=>{
        beforeEach(() => {
          // ... simulate user clicking food item
        })

        describe('then user types more', () => {
          beforeEach(() => {
            // ... simulate user typing "x"
          })

          describe('and API returns no resulst', ()=>{
            // ... simluate API returning no results
          })

          // ... specs
        })
      })
    })
  })
})
