import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import { client } from '../Client';

const MatchWhenLoggedIn = ({component:Component, ...rest}) => (

  <Match {...rest} render={(props) => {
    console.log(props)
    if (client.isLoggedIn())
    {
      return(<Component {...props} />)
    } else {
      return(<Redirect to={{
          pathname: "/login",
          state: {from: props.location}
        }}
      />)
    }
  }}
  />
);

export default MatchWhenLoggedIn;
