import React from 'react';
import ConnectionCounter from './components/ConnectionCounter.jsx'
import PlayButton from './components/PlayButton.jsx'
import UserButton from './components/UserButton.jsx'
import PubNubReact from 'pubnub-react'
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { numOfConnections: 0}
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-3f401cd6-e037-44fa-8f6e-d414446b10e6',
      subscribeKey: 'sub-c-990d41f6-dca4-11e9-b2f2-9a66d3fcadaa'
    });
    this.pubnub.init(this);
    this.pubnub.subscribe({
      channel: 'Connect',
      message: function addConnection(message) {
        if(message == "newConnection") {
          this.setState((state) => state.numOfConnections++);
        }
      }
    });
    this.PlayYoutube = this.PlayYoutube.bind(this);
  }

  PlayYoutube() {
    console.log("bitch")
  }

  render() {
    return (
      <div className="App">
        <PlayButton PlayYoutube={this.PlayYoutube}/>
        <UserButton/>
      </div>
    );
  }
}

export default App;
