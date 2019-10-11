import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Empty } from 'antd';

const Styles = theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: "100%",
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: theme.spacing(3),
    },
});
class MenuCard extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div >
                {this.props.data && this.props.match.params.id ?
                    Object.values(this.props.data).map((value) => {
                        if (this.props.match.params.id == value.ResturentName) {
                            return (
                                value.subItems ?
                                    value.subItems.map((item) => {
                                        return (
                                            <Paper className={classes.paper}>
                                                <h4 className={classes.head}>{item}</h4>
                                                <Table className={classes.table} size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Dish (100g serving)</TableCell>
                                                            <TableCell align="right">Price</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {value.item ?
                                                            Object.values(value.item).map((table) => {
                                                                return Object.values(table).map((item2, index2) => {
                                                                    if (item2.subitem == item) {
                                                                        return <TableRow key={index2}>
                                                                            <TableCell scope="row">
                                                                                {item2.name}
                                                                            </TableCell>
                                                                            <TableCell align="right">{item2.price}</TableCell>
                                                                        </TableRow>
                                                                    } 
                                                                })
                                                            })

                                                           
                                                        : null}
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        )
                                    })
                                    : null
                            )
                        }
                    })
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(MenuCard)))