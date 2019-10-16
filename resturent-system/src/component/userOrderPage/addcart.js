import React from 'react'
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, Button, Dialog, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Order from './Order';
import { Typography } from 'antd';
const Styles = theme => ({
    root: {
        flexGrow: 1,
        // overflowX: 'hidden',
    },
    paper: {
        height: '90vh',
        padding: '6px',
    }
    // webmenu: {
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'block'
    //     }
    // },
    // mobmenu: {
    //     display: 'block',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'none'
    //     }
    // }
});

class AddToCart extends React.Component {
    constructor() {
        super()
        this.state = {
            submit: false,
        }
    }
    checkout = () => {
        this.setState({
            submit: true
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div> <Paper className={classes.paper}>
                <h3 style={{ textAlign: 'center' }}>Your Add To Cart</h3>
                <Divider />
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dish (100g serving)</TableCell>
                            <TableCell align="right">Price</TableCell>

                        </TableRow>
                    </TableHead>
                    {this.props.arr.length ?
                        <TableBody>
                            {this.props.arr.map((item2, index2) => {
                                console.log(item2)
                                return <TableRow key={index2}>
                                <TableCell scope="row">
                                    {item2.name}
                                </TableCell>
                                <TableCell align="right">{item2.price}</TableCell>
                            </TableRow>
                            })}
                    </TableBody>
                        : <Typography.Text type="secondary" style={{ textAlign: "center" }}>You haven’t added anything to your cart yet! Start adding your favourite dishes</Typography.Text>}
                </Table>
                <Divider />
                <Button color="secondary" onClick={() => {
                    this.checkout()
                }}>Check out</Button>
            </Paper>
                {this.state.submit ?
                    <Order order={this.props.arr} open={this.state.submit} />
                    : null}
            </div>
        )
    }
}
export default withStyles(Styles)(AddToCart)