import React from 'react';

class ConnectionCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { numberOfConnections: 0 };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkConnectionUpdate = this.checkConnectionUpdate.bind(this);
    }

    componentDidMount() {
        this.props.pubnub.subscribe({
            channels: ['channell'],
            withPresence: true
        });

        this.pubnub.getMessage('channel1', (msg) => {
            console.log(msg);
        });
 
        this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: 'hello world from react',
                channel: 'channel1'
            });
        });
        setInterval(this.checkConnectionUpdate, 100);
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['channel1']
        });
    }

    checkConnectionUpdate() {
        console.log('checked!');
    }

    render() {
        const messages = this.pubnub.getMessage('channell');
        return (
            <div>
                <p>{this.state.numberOfConnections}</p>
            </div>
        );
    }

}

export default ConnectionCounter;