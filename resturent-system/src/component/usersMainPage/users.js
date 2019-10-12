import React from 'react'
import { Paper } from '@material-ui/core'
import WebMap from './webMap'
import AppBarComponent from './appbar'
import { withStyles } from '@material-ui/core/styles';
import MobMap from './mobMap';
import img from './download.jpg'
const Styles = theme => ({
    paperWeb: {
        height: "90vh",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${img})`,
        boxShadow: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    rgbaDiv: {
        height: "90vh",
        overflowY: 'scroll',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    papermob: {
        height: "90vh",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${img})`,
        boxShadow: 'none',
        boxShadow: 'none',
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
})
class UsersMainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            ResturentName: ""
        }
    }
    change = (ev) => {
        this.setState({
            ResturentName: ev.target.value
        })
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <AppBarComponent ResturentName={this.state.ResturentName} val={this.change} />
                <main>
                    <Paper className={classes.paperWeb}>
                        <div className={classes.rgbaDiv}>
                            <WebMap name={this.state.ResturentName} />
                        </div>
                    </Paper>
                    <Paper className={classes.papermob}>
                        <div className={classes.rgbaDiv}>
                            <MobMap name={this.state.ResturentName} />
                        </div>
                    </Paper>
                </main>
            </div>
        )
    }
}

export default withStyles(Styles)(UsersMainPage)