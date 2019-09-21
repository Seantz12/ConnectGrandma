import React from 'react';
import ConnectionCounter from './components/ConnectionCounter.jsx'
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class App extends React.Component {

  constructor(props) {
    super(props);
    client.onopen = () => { console.log('connected!'); }
    client.onmessage = (message) => { 
      const data = JSON.parse(message.data);
      console.log(data);
    }
  }

  render() {
    return (
      <div className="App">
        <ConnectionCounter />
        <p>hi</p>
      </div>
    );
  }
}

export default App;
