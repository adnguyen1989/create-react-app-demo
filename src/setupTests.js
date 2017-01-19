import React from 'react'
import { mount, render, shallow } from 'enzyme';
require('es6-promise').polyfill();
require('isomorphic-fetch');

global.mount = mount;
global.render = render;
global.shallow = shallow;
