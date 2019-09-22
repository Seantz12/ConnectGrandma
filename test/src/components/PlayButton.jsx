import React from 'react';
import Play from '../play.svg';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playing: false };
    }

    render() {
        return (
            <div>
                <img src={Play} height='200px' width='200px' onClick={this.props.PlayYoutube}/>
            </div>
        );
    }

}

export default PlayButton;