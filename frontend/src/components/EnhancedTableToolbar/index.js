import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

//Create User Button
const CreateButton = props => {
    return (
        <Button
            variant='fab'
            color='inherit'
            aria-label='Add'
            onClick={() => {
                props.history.push('/create');
            }}>
            <AddIcon /> 
        </Button>
    );
};
const CreateNewUserButton = withRouter(CreateButton);

const toolbarStyles = theme => ({
    root: {
        width: '100%'
    },
    title: {
        flex: "0 0 auto"
    },
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: 200,
        },
      },
      spacer: {
          flex: '1 1 50%'
      }
});

class EnhancedTableToolbar extends Component {
    state = {
        searchText: ''
    };

    onSearch(Searching) {
        setTimeout(function() {
            var tableId = document.getElementById('userListTable');
            var rowsLength = tableId.rows.length;
            var searchCol = 0;
            for(var i = 1; i < rowsLength; i++) {
                var searchText = tableId.rows[i].cells[searchCol].innerHTML;
                if(searchText.match(Searching)) {
                    tableId.rows[i].style.display='';
                } else {
                    tableId.rows[i].style.display='none';
                }
            }
        }, 200);
    }

    handleSearchTextChange = e => {
        this.setState({searchText: e.target.value});
    }

    render() {
        const { classes } = this.props;
        const { searchText } = this.state;
        return (
        <Toolbar>
        <div className={classes.title}>
            <Typography variant="h4">
                User List
            </Typography>
        </div>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder='Search First Name...'
                classes={{
                    root: classes.inoutRoot,
                    input: classes.inputInput,
                }}
                onChange={this.handleSearchTextChange}
                value={searchText}
                onKeyDown={this.onSearch(searchText)}
            />
        </div>
        <div className={classes.spacer} />
        <CreateNewUserButton />
        </Toolbar>
        );
    };   
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);