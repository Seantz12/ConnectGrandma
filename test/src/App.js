import React from 'react';
import ConnectionCounter from './components/ConnectionCounter.jsx'
import PlayButton from './components/PlayButton.jsx'
import PubNubReact from 'pubnub-react'
import ReactPlayer from 'react-player'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { numOfConnections: 0, playing: false}
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-3f401cd6-e037-44fa-8f6e-d414446b10e6',
      subscribeKey: 'sub-c-990d41f6-dca4-11e9-b2f2-9a66d3fcadaa'
    });
    this.pubnub.init(this)
    this.PlayYoutube = this.PlayYoutube.bind(this);
  }

  componentDidMount() {
    this.pubnub.subscribe({
      channel: 'Connect',
      restore: true,
      message: (message) => {
        console.log(message)
        this.setState((state) => state.numOfConnections++);
        if(message == "newConnection") {
          console.log('subscribed?');
        }
      }
    });
  }

  PlayYoutube() {
    console.log("bitch")
    this.setState((state) => state.playing = true);
    console.log(this.pubnub)
    this.pubnub.publish({
      channel:'Connect',
      message: 'newConnection'
    })
  }

  render() {
    console.log(this.pubnub.getMessage('Connect'));
    return (
      <div className="App">
        <ReactPlayer 
          id='youtube-player'
          playing={this.state.playing}
          height={500}
          width={1000}
          url='https://www.youtube.com/watch?v=WJq4jWSQNd8/'
          controls={false}
        />
        <PlayButton PlayYoutube={this.PlayYoutube}/>
      </div>
    );
  }
}

export default App;
