import React from 'react';
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import MatchWhenLoggedIn from './MatchWhenLoggedIn'
import Login from './Login'
import Logout from './Logout'

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <MatchWhenLoggedIn pattern="/albums" component={AlbumsContainer} />
      <Match exactly pattern="/" render={()=>(
        <Redirect to='/albums' />
      )} />
      <Match pattern="/logout" component={Logout} />
      <Match pattern="/login" component={Login} />
    </div>
  </div>
);

export default App;
