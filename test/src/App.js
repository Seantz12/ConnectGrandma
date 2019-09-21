import React from 'react';
import ConnectionCounter from './components/ConnectionCounter.jsx'
import PubNubReact from 'pubnub-react'
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-3f401cd6-e037-44fa-8f6e-d414446b10e6',
      subscribeKey: 'sub-c-990d41f6-dca4-11e9-b2f2-9a66d3fcadaa'
    });
    this.pubnub.init(this);
  }

  render() {
    return (
      <div className="App">
        <ConnectionCounter pubnub={this.pubnub} />
        <p>hi</p>
      </div>
    );
  }
}

export default App;
