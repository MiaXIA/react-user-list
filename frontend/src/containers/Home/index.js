import React from 'react';
import {withRouter} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import './index.css';

//User List Button
const UsersButton = props => {
    return (
        <Button
            variant='contained'
            aria-label='UserList'
            onClick={() => {
                props.history.push('/users');
            }}>
            User List
        </Button>
    );
};
const UserListButton = withRouter(UsersButton);

//Create User Button
const CreateButton = props => {
    return (
        <Button
            variant='contained'
            aria-label='Create'
            onClick={() => {
                props.history.push('/create');
            }}>
            Create User
        </Button>
    );
};
const CreateNewUserButton = withRouter(CreateButton);

const HomePage = () => (
    <Paper className='root'>
        <Typography variant='h4'>Welcome to Home!</Typography>
        <Divider />
        <Typography variant='h6'>A User Management Web Designed and Implemented by Mochen Xia</Typography>
        <div className='spacer' />
        <UserListButton />&nbsp;&nbsp;&nbsp;&nbsp;
        <CreateNewUserButton />
        <div className='spacer' />
        <Divider />
        <Typography variant='body1'>Project information:</Typography>
        <Typography variant='body1'>The frontend server is listening to localhost port 3000</Typography>  
        <Typography variant='body1'>The backend api server is listening to localhost port 4000</Typography>
        <Typography variant='body1'>The user's information is stored using MongoDB with MLab</Typography>   
    </Paper>
);

export default HomePage;