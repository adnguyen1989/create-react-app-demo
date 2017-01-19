import React from 'react'
import { shallow } from 'enzyme'
import FoodSearch from '~/src/components/FoodSearch'
import Client from '~/src/helpers/Client'
require('es6-promise').polyfill();
require('isomorphic-fetch');

jest.mock('../../src/helpers/Client')

describe('(Component) FoodSearch', () => {
  // ... initial state specs

  let wrapper;
  const onFoodClick = jest.fn()

  beforeEach(()=>{
    wrapper = shallow(<FoodSearch onSubmit={onFoodClick}/>)
  })

  afterEach(function () {
    Client.search.mockClear();
    onFoodClick.mockClear();
  });

  it ("does not render the remove button", ()=>{
    expect(wrapper.find('.remove.icon').first().props().hidden).toEqual(true)
  })

  it ("renders an empty list", ()=>{
    expect(wrapper.find('#selectedResults tbody tr').length).toEqual(0)
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
      expect(wrapper.state().filterText).toEqual(value)
    })

    it ("renders the remove button", ()=>{
      expect(wrapper.find('.remove.icon').first().props().hidden).toEqual(false)
    })

    it ('should call Client.search() with value', ()=>{
      const invocations = Client.search.mock.calls;
      expect(invocations[invocations.length-1][0]).toEqual(value)
    })

    describe('and API returns results', () => {
      const foods = [
        {
          description: 'Broccolini',
          kcal: '100',
          protein_g: '11',
          fat_g: '21',
          carbohydrate_g: '31',
        },
        {
          description: 'Broccoli rabe',
          kcal: '200',
          protein_g: '12',
          fat_g: '22',
          carbohydrate_g: '32',
        },
      ];

      beforeEach(()=>{
        const invocations = Client.search.mock.calls;
        const cb = invocations[invocations.length-1][1];
        cb(foods);
        wrapper.update();
      });

      it ('should call update the search results accordingly', ()=>{
        expect(wrapper.state().searchResults).toEqual(foods)
      })

      it ('should call add two rows to the table', ()=>{
        expect(wrapper.find('#selectedResults tbody tr').length).toEqual(2)
      })

      it ('should render description of first food', ()=>{
        expect(wrapper.html()).toContain(foods[0].description)
      })

      it ('should render description of second food', ()=>{
        expect(wrapper.html()).toContain(foods[1].description)
      })

      describe('then user clicks food item', ()=>{

        beforeEach(() => {
          const addButton = wrapper.find('button.add-button').first();
          addButton.simulate('click');
        })

        it ('should call prop "onFoodClick" with the row information', ()=>{
          const food = foods[0]
          expect(onFoodClick.mock.calls[0]).toEqual([food])
        })

        describe('then user types more', () => {
          const value = "broccxx"

          beforeEach(() => {
            const input = wrapper.find('input#searchField').first();
            input.simulate('change', {
              target: { value: value }
            })
          })

          describe('and API returns no results', ()=>{
            beforeEach(()=>{
              const invocations = Client.search.mock.calls;
              const cb = invocations[invocations.length-1][1];
              cb([]);
              wrapper.update();
            });

            it ('should call update the search results accordingly', ()=>{
              expect(wrapper.state().searchResults).toEqual([])
            })

            it ('should call add no row the table', ()=>{
              expect(wrapper.find('#selectedResults tbody tr').length).toEqual(0)
            })
          })
        })
      })

      describe('user clicks clear button', ()=>{
        beforeEach(() => {
          const clearButton = wrapper.find('button.remove.icon').first();
          clearButton.simulate('click');
        })

        it ('should set the filterText', ()=>{
          expect(wrapper.state().filterText).toEqual("")
        })

        it ('should hide the clear button', ()=>{
          expect(wrapper.find('.remove.icon').first().props().hidden).toEqual(true)
        })
      })
    })
  })
})
