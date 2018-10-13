import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import './index.css';

const ReturnButton = props => {
    return (
        <Button
            variant='contained'
            onClick={() => {
                props.history.push('/users');
            }}>
            Return   
        </Button>
    );
};
const WithRouterButton = withRouter(ReturnButton);

class CreateNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', sex: '', age: '', psWord: '', repeat: ''};
    }

    handleFirstNameChange = e => {
        this.setState({firstname: e.target.value});
    }

    handleLastNameChange = e => {
        this.setState({lastname: e.target.value});
    }

    handleSexChange = e => {
        this.setState({sex: e.target.value});
    }

    handleAgeChange = e => {
        this.setState({age: e.target.value});
    }

    handlePassWordChange = e => {
        this.setState({psWord: e.target.value});
    }

    handleRepeatChange = e => {
        this.setState({repeat: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.psWord === this.state.repeat) {
            axios
                .post(`http://localhost:4000/api/users/insertone`, this.state)
                .then(response => {
                    alert("The user has been created!");
                })
                .catch(err => {
                    alert(err);
                });
        } else {
            alert("Password didn't match!");
        }
    };

    render() {
        return (
            <Paper className='createformroot'>               
                <Toolbar>
                    <Typography variant='h5' className='formtitle'>
                        Create User
                    </Typography>
                    <WithRouterButton />
                </Toolbar> 
                <Divider />
                <div className='formspacer'>           
                    <form onSubmit={this.handleSubmit}>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='firstname'>First Name</InputLabel>
                            <Input id='firstname'
                                type='text'
                                value={this.state.firstname}
                                onChange={this.handleFirstNameChange}
                                placeholder="First Name" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='lastname'>Last Name</InputLabel>
                            <Input id='lastname'
                                type='text'
                                value={this.state.lastname}
                                onChange={this.handleLastNameChange}
                                placeholder="Last Name"/>
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='sex'>Sex</InputLabel>
                            <Input id='sex'
                                type='text'
                                value={this.state.sex}
                                onChange={this.handleSexChange}
                                placeholder="Sex" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='age'>Age</InputLabel>
                            <Input id='age'
                                type='text'
                                value={this.state.age}
                                onChange={this.handleAgeChange}
                                placeholder="Age" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <Input id='password'
                                type='password'
                                value={this.state.psWord}
                                onChange={this.handlePassWordChange}
                                placeholder="Password" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='repeat'>Repeat Password</InputLabel>
                            <Input id='repeat'
                                type='password'
                                value={this.state.repeat}
                                onChange={this.handleRepeatChange}
                                placeholder="Repeat Password"/>
                        </FormControl>
                        <Button 
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </div> 
            </Paper>
        )
    }
}

export default CreateNewUser;