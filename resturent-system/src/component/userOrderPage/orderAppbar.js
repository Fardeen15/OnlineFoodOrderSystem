
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
            value: 0
        }
    }
    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor:'black'}} color="black">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="white"
                        
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab style={{color : 'white'}} label="Order panel" />
                        <Tab style={{color : 'white'}} color = "white" label="Menu card" />
                    </Tabs>
                </AppBar>

                <TabPanel value={this.state.value} index={0}>
                    <Order />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <Menucard />
                </TabPanel>

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