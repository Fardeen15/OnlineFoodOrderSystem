import { withStyles, fade } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { AppBar, InputBase, IconButton, Toolbar, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
import { auth, db } from '../../firebaseConfige';
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { connect } from 'react-redux'

const Styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class AppBarComponent extends Component {
    constructor() {
        super()
        this.state = {
            modal: false
        }
    }
    signout = () => {
        auth.signOut().then(() => {
            this.props.history.push('/')
        })
    }
    PendingOrder = () => {
        this.setState({
            modal: true
        })
        auth.onAuthStateChanged((user)=>{
            if(user){
                if(this.props.data.user[user.uid].AcceptedOrders){
                    console.log(Object.values(this.props.data.user[user.uid].AcceptedOrders))
                }
            }
        })
    }
    render() {
        const { classes } = this.props

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                value={this.props.ResturentName}
                                placeholder="Search…"
                                onChange={this.props.val}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button onClick={this.PendingOrder}>Your Pending Orders</Button>
                            <Button onClick={this.signout}>SignOut</Button>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.state.modal ?
                    <Modal
                        title={"Order"}
                        visible={this.state.modal}
                        onOk={() => this.setState({ modal: false })}
                        okText={"ok"}
                        cancelText="Decline"
                        onCancel={() => this.setState({ val: "", infoDailog: false })}
                    >
            
                    </Modal>
                    : null}
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state,

    }
}
const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(Styles)(withRouter(AppBarComponent)))