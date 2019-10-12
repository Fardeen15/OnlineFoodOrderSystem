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
import { storage } from '../../firebaseConfige';

const Styles = theme => ({
    card: {
        margin: '8px',
        width: "40%",
        maxWidth: 345,
    },
    flexDiv: {
        justifyContent: "space-evenly",
        display: "flex",
        flexWrap: "wrap",
    }
});

class WebMAp extends React.Component {
    constructor() {
        super()
        this.state = {
            imageurl: [],
            imageName: []
        }
    }
    componentDidMount() {
        if (!this.props.data) {
            console.log(true)
            this.props.getdata()
        }
    }
    route = (name) => {
        this.props.match.params.id = name
        this.props.history.push(`/mainpage/${name}`)
    }
    componentWillReceiveProps() {
        if (this.props.images) {
            let { imageName } = this.state
            let { imageurl } = this.state
            this.props.images.items.forEach(element => {
                if (imageName.length) {
                    for (var i = 0; i < imageName.length; i++) {
                        if (imageName[i] !== element.name) {
                            storage.refFromURL(element.toString()).getDownloadURL().then((url) => {
                                if (imageurl[i] !== url) {
                                    imageName.push(element.name)
                                    imageurl.push(url)
                                }
                            })
                            this.setState({
                                imageName,
                                imageurl
                            })
                        }
                    }

                } else {
                    if (!imageName.length) {
                        storage.refFromURL(element.toString()).getDownloadURL().then((url) => {
                            this.setState({
                                imageName: [element.name],
                                imageurl: [url]
                            }, () => {
                            })
                        })
                    }

                }
            })
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.flexDiv}>
                {this.props.data ?
                    Object.values(this.props.data).map((value) => {
                        if (this.props.name) {
                            if (this.props.name == value.ResturentName) {
                                return (
                                    <Card onClick={() => this.route(value.ResturentName)} className={classes.card}>
                                        <CardActionArea>
                                            {this.state.imageName ?
                                                this.state.imageName.map((name, index2) => {
                                                    if (name == value.ResturentName) {
                                                        return (
                                                            <CardMedia
                                                                component="img"
                                                                // alt="Contemplative Reptile"
                                                                height="280"
                                                                image={this.state.imageurl[index2]}
                                                            // title="Contemplative Reptile"
                                                            />
                                                        )
                                                    }
                                                }) : null}
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
                                <Card onClick={() => this.route(value.ResturentName)} className={classes.card}>
                                    <CardActionArea>
                                        {this.state.imageName ?
                                            this.state.imageName.map((name, index2) => {
                                                if (name == value.ResturentName) {
                                                    return (
                                                        <CardMedia
                                                            component="img"
                                                            // alt="Contemplative Reptile"
                                                            height="220"
                                                            image={this.state.imageurl[index2]}
                                                        // title="Contemplative Reptile"
                                                        />
                                                    )
                                                }
                                            }) : null}
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
        data: state.resturents,
        images: state.ProfileImages
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(WebMAp)))