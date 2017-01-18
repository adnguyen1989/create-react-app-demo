import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Form4 from '~/src/components/Form4'

const wrapper = shallow(<Form4 />);

describe('(Component) Form4', () => {
  it('renders...', () => {
    expect(wrapper).to.have.length(1);
  });
});

