// import React from 'react'
// import { shallow } from 'enzyme'
// import { expect } from 'chai'
// import Form4 from '~/src/components/Form4'
// import sinon from 'sinon';


// describe('(Component) Form4', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallow(<Form4 />)
//   })

//   describe('renders static elements', () => {
//     it('renders the title', () => {
//       expect(wrapper.containsMatchingElement(<h1>Sign Up Sheet</h1>)).to.equal(true);
//     });

//     it('renders the list', () => {
//       expect(wrapper.containsMatchingElement(<h3>People</h3>)).to.equal(true);
//     });

//     it('renders two fields', () => {
//       expect(wrapper.find('form')).to.have.length(1);
//     });

//     it('renders two fields', () => {
//       expect(wrapper.find('Field')).to.have.length(2);
//     });

//     it('renders one course select', () => {
//       expect(wrapper.find('CourseSelect')).to.have.length(1);
//     });

//     it('renders one submit button', () => {
//       expect(wrapper.containsMatchingElement(<input type='submit'></input>)).to.equal(true);
//     });
//   })

//   describe('renders the state of submit button', ()=>{
//     it ('renders the ready state',()=>{
//       wrapper.setState({_saveStatus: "READY"});
//       const input = wrapper.find('input').first();
//       expect(input.props().value).to.equal("Submit");
//     });

//     it ('renders the saving state',()=>{
//       wrapper.setState({_saveStatus: "SAVING"});
//       const input = wrapper.find('input').first();
//       expect(input.props().value).to.equal("Saving");
//     });

//     it ('renders the success state',()=>{
//       wrapper.setState({_saveStatus: "SUCCESS"});
//       const input = wrapper.find('input').first();
//       expect(input.props().value).to.equal("Success");
//     });

//     it ('renders the error state',()=>{
//       wrapper.setState({_saveStatus: "ERROR"});
//       const input = wrapper.find('input').first();
//       expect(input.props().value).to.equal("Save failed");
//     });

//   })


// });

