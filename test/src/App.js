import React from 'react';
import PlayButton from './components/PlayButton.jsx'
import UserButton from './components/UserButton.jsx'
import PubNubReact from 'pubnub-react'
import ReactPlayer from 'react-player'
import uuidv1 from 'uuid/v1'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      numOfConnections: 0, 
      playing: false, 
      rectHidden: false,
      uuid: uuidv1()
    }
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-3f401cd6-e037-44fa-8f6e-d414446b10e6',
      subscribeKey: 'sub-c-990d41f6-dca4-11e9-b2f2-9a66d3fcadaa',
      uuid: this.state.uuid
    });
    this.pubnub.init(this)
    this.PlayYoutube = this.PlayYoutube.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.imageHide = this.imageHide.bind(this);
  }

  playVideo() {
    console.log('test')
    this.setState({
      playing: true,
      imageHide: true
    });
  }

  componentDidMount() {
    console.log('hello')
    this.pubnub.subscribe({
      channels: ['Channel-s1dzpkkm1'],
      restore: true,
      withPresence: true,
      message: (message) => {
        console.log(message)
        console.log('recieved!!')
        this.setState((state) => state.numOfConnections++);
        if(message == "newConnection") {
          console.log('subscribed?');
        }
      }
    });
    this.pubnub.addListener({ 
      message: (message) => {
        if(message.message === 'play-video') this.playVideo();
      },
      presence: (presenceEvent) => {
        console.log('I sense... A PRESENCE: ', presenceEvent);
      }
    });
    this.pubnub.hereNow({
      channels: ['Channel-s1dzpkkm1'],
      includeUUIDs: true,
    },
    (status, response) => {
      console.log('presence callback')
      console.log(status);
      console.log(response);
    }
    )
  }

  PlayYoutube() {
    this.pubnub.publish({
      channel:'Channel-s1dzpkkm1',
      message: 'play-video'
    })
  }

  imageHide() {
    this.setState((state) => state.rectHidden = true);
  }

  render() {
    console.log(this.pubnub.getMessage('Connect'));
    return (
      <div className="App">
        <svg hidden={this.state.rectHidden} onClick={this.imageHide} width="1920" height="1080">
          <rect width="1920" height="3000" />
        </svg>
        <ReactPlayer 
          id='youtube-player'
          playing={this.state.playing}
          height={500}
          width={1000}
          url='https://www.youtube.com/watch?v=CH1bHOiVuH4'
          controls={false}
        />
        <PlayButton PlayYoutube={this.PlayYoutube}/>
        <UserButton/>
      </div>
    );
  }
}

export default App;
