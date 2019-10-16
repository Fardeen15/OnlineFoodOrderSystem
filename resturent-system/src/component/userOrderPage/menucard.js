import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withRouter } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Description from './descriptionDailog';
import AddToCart from './addcart';
import { storage } from '../../firebaseConfige';

const Styles = theme => ({
    root: {
        width: '100%',
    },
    mainDiv: {
        display: 'flex',
    },
    firstDiv: {
        width: "70%",
        height: "92vh",
        overflowY: 'scroll',
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
    secondDiv: {
        // paddingTop: '26px',
        width: '30%',
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: theme.spacing(3),
    },
});
class MenuCard extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: [],
            addDescription: false,
            data: "",
            arr: [],
            imageurl: ""
        }
    }
    componentWillReceiveProps() {
        console.log(this.props)
        
    }
    descriptionmodel = (value, index) => {
        var obj = {
            index: index,
            value: value
        }
        this.setState({
            addDescription: true,
            data: obj
        })
    }
    orderObjects = (value) => {
        var { arr } = this.state
        arr.push(value)
        this.setState({
            arr,
        })
    }
    del = (value) => {
        var { arr } = this.state
        arr.splice(value, 1)
        this.setState({
            arr,
        })
        console.log(arr)
    }
    addItem = (value, index2) => {
        // if (index2) {

        var selectedIndex = this.state.selectedIndex
        if (selectedIndex.length) {
            for (var i = 0; i < selectedIndex.length; i++) {
                if (selectedIndex[i] !== index2) {
                    selectedIndex.push(index2)
                    console.log('push')
                }
                this.setState({ selectedIndex })
            }
        } else {
            selectedIndex.push(index2)
            this.setState({ selectedIndex })
            console.log(selectedIndex)
        }
        if (value) {
            this.orderObjects(value)
        }
        this.setState({
            addDescription: false
        })
    }
    delete = (i) => {
        var data = this.state.selectedIndex
        data.splice(i, 1)
        this.setState({
            selectedIndex: data
        })
        this.del(i)
    }
    order = (index2) => {
        var data = this.state.selectedIndex
        for (var i = 0; i < data.length; i++) {
            if (data[i] == index2) {
                return <TableCell align="right"><CheckIcon style={{ color: 'green' }} /> <DeleteForeverIcon onClick={() => this.delete(i)} style={{ color: 'red' }} /></TableCell>
            }
        }
    }
    render() {
        if (this.props.images && !this.state.imageurl) {
            this.props.images.items.forEach(element => {
                if (this.props.match.params.id === element.name) {
                    storage.refFromURL(element.toString()).getDownloadURL().then((url) => {

                        this.setState({
                            imageurl: url
                        }, () => {
                            console.log(this.state.imageurl)
                        })

                    })
                }

            })


        }
        console.log(this.props)
        const { classes } = this.props
        return (
            <div className={classes.mainDiv}>
                <div id="scroll" className={classes.firstDiv}>
                    {this.state.imageurl ?
                        <img width='100%' src={this.state.imageurl} />
                        : 'hello'}
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
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="right"></TableCell>
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
                                                                                <TableCell align="right"><AddCircleIcon onClick={() => this.descriptionmodel(item2, index2)} style={{ color: 'red' }} /></TableCell>
                                                                                {this.state.selectedIndex ? this.order(index2) : null}

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
                <Paper className={classes.secondDiv}>
                    <AddToCart arr={this.state.arr} />
                </Paper>
                {this.state.addDescription ?
                    <Description addItem={this.addItem} data={this.state.data} open={this.state.addDescription} />
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,
        images: state.ProfileImages
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(MenuCard)))