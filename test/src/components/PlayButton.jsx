import React from 'react';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playing: false };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.PlayYoutube}>
                    PLAY
                </button>
            </div>
        );
    }

}

export default PlayButton;