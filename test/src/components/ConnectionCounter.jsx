import React from 'react';

class ConnectionCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { numberOfConnections: 0 };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkConnectionUpdate = this.checkConnectionUpdate.bind(this);
    }

    componentDidMount() {
        setInterval(this.checkConnectionUpdate, 100);
    }

    checkConnectionUpdate() {
        console.log('checked!');
    }

    render() {
        return (
            <div>
                <p>{this.state.numberOfConnections}</p>
            </div>
        );
    }

}

export default ConnectionCounter;