import React from 'react';
import {DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import UserGroup from '../user.svg';

class UserButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <ButtonToolbar>
                    <DropdownButton drop='up' variant='secondary' title='SEE CURRENT USERS' id='currentUsers' key='up'>
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar> */}
                <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">
                    <img src={UserGroup} height='50px' width='50px' />
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                    <li role="presentation">Menu item 1</li>
                </ul>
                </div>
            </div>
        );
    }

}

export default UserButton;