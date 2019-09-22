import React from 'react';
import {DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';

class UserButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <DropdownButton drop='up' variant='secondary' title='SEE CURRENT USERS' id='currentUsers' key='up'>
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        );
    }

}

export default UserButton;