
import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Order from './Order';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menucard from './menucard';
import { Badge, Toolbar } from '@material-ui/core';

const Styles = theme => ({
    root: {
        flexGrow: 1,
        // overflowX: 'hidden',
    },
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
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    if (index === 0) {
        return (
            <Typography
                className="imageDiv"
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                <Box p={1}>{children}</Box>
            </Typography>
        );
    } else {
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                <Box p={1}>{children}</Box>
            </Typography>
        );
    }
}

class OrderAppBAr extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 0,
            arr: [],
            // order: true,
            menu: true
        }
    }
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };
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
    obj = () => {
        return this.state.arr
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <AppBar position="static" style={{ backgroundColor: 'black' }} color="black">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="white"

                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab style={{ color: 'white' }} onClick={() => { this.setState({ order: true, menu: false }) }} label={<Badge badgeContent={this.state.arr.length} color="secondary">Order panel</Badge>} />
                        <Tab style={{ color: 'white' }} onClick={() => { this.setState({ order: false, menu: true }) }} color="white" label="Menu card" />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={1}>
                </TabPanel> */}
                <AppBar style={{ backgroundColor: 'black', color: 'white' }} color="white" position="static">
                    <Toolbar>
                        <Typography style={{ color: 'white' }} className={classes.title} variant="h6" noWrap>
                            {this.props.match.params.id ? this.props.match.params.id : 'helloo'}
                        </Typography>
                        <div style={{ color: 'white' }} className={classes.search}>

                        </div>
                        <div style={{ color: 'white' }} className={classes.grow} />
                        <div className={classes.sectionDesktop}>

                        </div>
                        <div style={{ color: 'white' }} className={classes.sectionMobile}>
                        </div>
                    </Toolbar>
                </AppBar>
                <main>
                    {this.state.menu?
                    <Menucard del={this.del} ObjOrder={this.orderObjects} />
                    :null}

                </main>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(OrderAppBAr)))

