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
import { withRouter } from 'react-router-dom'

const Styles = theme => ({
    card: {
        maxWidth: 345,
    },
});

class WebMAp extends React.Component {
    
    route=(name)=>{
        console.log(this.props.match.params)
        this.props.match.params.id = name
        this.props.history.push(`/mainpage/${name}`)
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
                                    <Card onClick={()=>this.route(value.ResturentName)} className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="Contemplative Reptile"
                                            />
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
                                        </CardActionArea>
                                    </Card>)
                            }
                        } else {
                            return (
                                <Card  onClick={()=>this.route(value.ResturentName)} className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
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
                                    </CardActionArea>
                                </Card>)
                        }
                    })
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(WebMAp)))