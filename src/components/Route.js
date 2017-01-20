import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Redirect from 'react-router/Redirect';
import Miss from 'react-router/Miss';

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

class BlackSea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 3,
    };
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => (
      this.setState({ counter: this.state.counter - 1 })
    ), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval)
  }

  render() {
    return (
      <div>
        <h3>Black Sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in {this.state.counter}...</p>
        {
          (this.state.counter < 1) ? (
            <Redirect to='/atlantic' />
          ) : null
        }
      </div>
    );
  }
}

const App = () => {
  return (
    <Router>
      <div className='ui text container'>
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <Link to='/atlantic'>
              <span>/atlantic</span>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <span>/pacific</span>
            </Link>
          </li>
          <li>
            <Link to='/black_sea'>
              <span>/black_sea</span>
            </Link>
          </li>
          <li>
            <Link to='/atlantic/ocean'>
              <span>/atlantic/ocean</span>
            </Link>
          </li>
        </ul>

        <hr />

        <Match exactly pattern="/atlantic" component={Atlantic} />
        <Match exactly pattern="/atlantic/ocean" render={()=>(
            <div>
              <h3>Atlantic Ocean — Again!</h3>
              <p>
                The Atlantic Ocean covers approximately 29% of
                the world's water surface area.
              </p>
            </div>
          )}/>
        <Match pattern="/pacific" component={Pacific} />
        <Match pattern="/black_sea" component={BlackSea} />
        <Match exactly pattern='/' render={()=>(
          <h3>
            Welcome! Select a body of saline water above.
          </h3>
        )} />

        <Miss render={({location})=> (
          <div className='ui inverted red segment'>
            <h3>
              Error! No matches for <code>{location.pathname}</code>
            </h3>
          </div>
        )} />

      </div>
    </Router>
  );
}

export default App;
