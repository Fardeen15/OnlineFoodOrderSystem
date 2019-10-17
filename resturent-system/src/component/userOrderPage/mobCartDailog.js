import React from 'react'
import Addcart from './addcart';
import { withStyles } from '@material-ui/core/styles';

import {
    Dialog, AppBar, Toolbar, IconButton,
    Typography, Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },

})

class CartModal extends React.Component {

    render() {
        const { classes } = this.props
        return (

            <Dialog fullScreen open={this.props.open} onClose={this.props.close} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.close} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Sound
            </Typography>
                    </Toolbar>
                </AppBar>
                <Addcart arr={this.props.arr} />
            </Dialog>
        )

    }
}
export default withStyles(Styles)(CartModal)
