import React from 'react';
import Play from '../play.svg';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playing: false };
    }



    render() {
        return (
            <div style={{position:"absolute", top:"40%", left:"80%"}} hidden={this.props.hidden}>
                <img src={Play} height='200px' width='200px' onClick={this.props.PlayYoutube}/>
            </div>
        );
    }

}

export default PlayButton;