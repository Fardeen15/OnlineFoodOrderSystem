import React from 'react'
import { Paper } from '@material-ui/core'
import WebMap from './webMap'
import AppBarComponent from './appbar'
import { withStyles } from '@material-ui/core/styles';
import MobMap from './mobMap';

const Styles = theme => ({
    paperWeb: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    papermob: {
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
                        <WebMap name={this.state.ResturentName} />
                    </Paper>
                    <Paper className={classes.papermob}>
                        <MobMap name={this.state.ResturentName}/>
                    </Paper>
                </main>
            </div>
        )
    }
}

export default withStyles(Styles)(UsersMainPage)