import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getdata } from '../../action';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const Styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },

});

class MobMap extends React.Component {
    componentDidMount() {
        if (!this.props.data) {
            console.log(true)
            this.props.getdata()
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                {this.props.data ?
                    Object.values(this.props.data).map((value) => {
                        if (this.props.name) {
                            if (this.props.name == value.ResturentName) {
                                return (
                                    <Card className={classes.card}>
                                        <div className={classes.details}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {value.ResturentName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Deliver Charges : {value.cash}
                                                </Typography>
                                                <Typography color="textSecondary" component="p">
                                                    city : {value.city}
                                                </Typography>
                                                <Typography color="textSecondary" component="p">
                                                    area : {value.area}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <CardMedia
                                            className={classes.cover}
                                            image="/static/images/cards/live-from-space.jpg"
                                            title="Live from space album cover"
                                        />
                                    </Card>)
                            }
                        } else {
                            return (
                                <Card className={classes.card}>
                                <div className={classes.details}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.ResturentName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Deliver Charges : {value.cash}
                                        </Typography>
                                        <Typography color="textSecondary" component="p">
                                            city : {value.city}
                                        </Typography>
                                        <Typography color="textSecondary" component="p">
                                            area : {value.area}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <CardMedia
                                    className={classes.cover}
                                    image="/static/images/cards/live-from-space.jpg"
                                    title="Live from space album cover"
                                />
                            </Card>)
                        }
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
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(MobMap))