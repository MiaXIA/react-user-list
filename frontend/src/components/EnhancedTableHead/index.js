import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const rows = [
    { id: "firstname", numeric: true, disablePadding: false, label: "First Name"},
    { id: "lastname", numeric: true, disablePadding: false, label: "Last Name" },
    { id: "sex", numeric: true, disablePadding: false, label: "Sex" },
    { id: "age", numeric: true, disablePadding: false, label: "Age" },
    { id: "edit", numeric: true, disablePadding: false, label: "Edit" },
    { id: "delete", numeric: true, disablePadding: false, label: "Delete" }
];

class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            order,
            orderBy,
        } = this.props;

        return (
            <TableHead>
              <TableRow>
                {rows.map(row => {
                  return (
                    <TableCell
                      key={row.id}
                      numeric={row.numeric}
                      padding={row.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === row.id ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement={row.numeric ? "bottom-end" : "bottom-start"}
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
          );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;