import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
const Styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: 'flex'
    },
    form: {
        marginRight: "auto",
        marginLeft: "auto",
        border: "none",
        height: "58vh",

        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            top: '10%',
            width: "65%",
        }
    },
    div3: {
        width: "100%",
        border: "none",
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            backgroundColor: 'transparent',

        }
    },
    div2: {
        display: "none",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: "50%",
            backgroundColor: 'transparent'
        }
    },
    detail: {
        position: "relative",
        top: "40%",
    },
    main: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100vh",
    }
});

class WebMAp extends React.Component {
    render() {
        console.log(this.props.data)

        // const { data } = this.props
        return (
            <div>

                {this.props.data ?
                    Object.values(this.props.data).map((value) => {
                        console.log(value)
                        return <h1>{value.ResturentName}</h1>
                    })
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state.resturents
    }
}

export default connect(mapStateToProps)(withStyles(Styles)(WebMAp))