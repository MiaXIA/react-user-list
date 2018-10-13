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

import './index.css';

const EditButton = props => {
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
const WithRouterButton = withRouter(EditButton);

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`http://localhost:4000/api/users/getone/${this.props.match.params.username}`)
            .then(response => {
                const data = response.data;
                this.setState({firstname: data.firstname, lastname: data.lastname, sex: data.sex, age: data.age});
            })
            .catch(err => {
                alert(err);
            });
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
                .put(`http://localhost:4000/api/users/updateone/${this.props.match.params.username}`, this.state)
                .then(response => {
                    alert("The user information has been updated!");
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
            <Paper className='editformroot'>
                <Toolbar>
                    <Typography variant='h5' className='formtitle'>
                        Edit User
                    </Typography>
                    <WithRouterButton />
                </Toolbar>
                <Divider />
                <div className='formspacer'>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='contained'>
                                First Name
                            </Typography>
                            <Input id='firstname'
                                type='text'
                                value={this.state.firstname}
                                disabled
                                 />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='contained'>
                                Last Name
                            </Typography>
                            <Input id='lastname'
                                type='text'
                                value={this.state.lastname}
                                disabled
                                 />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='primary'>
                                Sex
                            </Typography>
                            <Input id='sex'
                                type='text'
                                value={this.state.sex}
                                onChange={this.handleSexChange}
                                placeholder="Sex" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='primary'>
                                Age
                            </Typography>
                            <Input id='age'
                                type='text'
                                value={this.state.age}
                                onChange={this.handleAgeChange}
                                placeholder="Age" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='primary'>
                                Password
                            </Typography>
                            <Input id='password'
                                type='password'
                                value={this.state.psWord}
                                onChange={this.handlePassWordChange}
                                placeholder="Password" />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <Typography variant='body1' color='primary'>
                                Repeat Password
                            </Typography>
                            <Input id='repeat'
                                type='password'
                                value={this.state.repeat}
                                onChange={this.handleRepeatChange}
                                placeholder="Repeat Password" />
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

export default EditUser;