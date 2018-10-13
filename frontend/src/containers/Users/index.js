import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import {getUsers} from '../../actions/users';

import EnhancedTableHead from '../../components/EnhancedTableHead';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import './index.css';

//Edit User Button
const EditButton = props => {
    return (
        <Button
            variant='contained'
            aria-label='Edit'
            onClick={() => {
                props.history.push(`/users/${props.userId}`);
            }}>
            Edit
        </Button>
    );
};
const EditUserButton = withRouter(EditButton);

//Delete User Button
const DeleteButton = props => {
    return (
        <Button
            variant='contained'
            aria-label='Delete'
            onClick={() => {
                deleteUserById(props.userId);
            }}>
            <DeleteIcon />
        </Button>
    );
};
const DeleteUserButton = withRouter(DeleteButton);

function deleteUserById(userid) {
    axios
        .delete(`http://localhost:4000/api/users/deleteone/${userid}`)
        .then(response => {
            alert("The user has been deleted!");
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        });
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class Users extends Component {
    state = {
        order: 'asc',
        orderBy: 'firstname',
        page: 0,
        rowsPerPage: 5
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUsers());
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";
        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render() {
        const { users } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.data.length - page * rowsPerPage);
        let usersUI;

        if(users.isLoading) {
            usersUI = <p>Loading</p>;
        } else if (users.error !== '') {
            usersUI = <p style={{color: 'red'}}>{users.error}</p>
        } else if (users.data.length !== 0) {
            usersUI = (
                <Paper className='root'>
                    <EnhancedTableToolbar />
                    <div className = 'tableWrapper'>
                        <Table id='userListTable' className = 'materialTable' aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order = {order}
                                orderBy = {orderBy}
                                onRequestSort = {this.handleRequestSort}
                                rowCount = {users.data.length}
                            />
                            <TableBody>
                                {stableSort(users.data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(user => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex = {-1}
                                                key = {user._id}
                                            >
                                                <TableCell numeric>
                                                    {user.firstname}
                                                </TableCell>
                                                <TableCell numeric>{user.lastname}</TableCell>
                                                <TableCell numeric>{user.sex}</TableCell>
                                                <TableCell numeric>{user.age}</TableCell>
                                                <TableCell numeric>
                                                    <EditUserButton userId={user._id} />
                                                </TableCell>
                                                <TableCell numeric>
                                                    <DeleteUserButton userId={user._id} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component='div'
                        count = {users.data.length}
                        rowsPerPage = {rowsPerPage}
                        page = {page}
                        backIconButtonProps={{
                            "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page"
                        }}
                        onChangePage = {this.handleChangePage}
                        onChangeRowsPerPage = {this.handleChangeRowsPerPage}
                    />
                </Paper>
            );
        }
        return (
            <div>
                {usersUI}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(Users);