import React from 'react';
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
    this.playVideo = this.playVideo.bind(this);
  }

  playVideo() {
    console.log('test')
    this.setState((state) => state.playing = true);
  }

  componentDidMount() {
    console.log('hello')
    this.pubnub.subscribe({
      channels: ['Channel-s1dzpkkm1'],
      restore: true,
      message: (message) => {
        console.log(message)
        console.log('recieved!!')
        this.setState((state) => state.numOfConnections++);
        if(message == "newConnection") {
          console.log('subscribed?');
        }
      }
    });
    this.pubnub.addListener({ message: (message) => {
      this.playVideo();
      console.log(message);
      console.log(message.message);
    }});
  }

  PlayYoutube() {
    console.log("bitch")
    console.log(this.pubnub)
    this.pubnub.publish({
      channel:'Channel-s1dzpkkm1',
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
