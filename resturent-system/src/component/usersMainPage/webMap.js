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
import { Empty } from 'antd';
import { ButtonBase } from '@material-ui/core';

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
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

class WebMAp extends React.Component {
    constructor() {
        super()
        this.state = {
            imageurl: [],
            imageName: []
        }
    }
    route = (name) => {
        this.props.match.params.id = name
        this.props.history.push(`/mainpage/${name}`)
    }
    componentWillMount() {
        if (!this.props.data) {
            console.log(true)
            this.props.getdata()
        }
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
                    // if (!imageName.length) {
                    storage.refFromURL(element.toString()).getDownloadURL().then((url) => {
                        this.setState({
                            imageName: [element.name],
                            imageurl: [url]
                        }, () => {
                        })
                    })
                    // }

                }
            })
        }
    }
    componentWillReceiveProps() {
        if (this.props.images) {
            this.setState({
                imageName: [],
                imageurl: [],
            }, () => {

                let { imageName } = this.state
                let { imageurl } = this.state
                this.props.images.items.forEach(element => {
                    if (imageName.length) {
                        console.log('true')
                        for (var i = 0; i < imageName.length; i++) {
                            if (imageName[i] !== element.name) {
                                storage.refFromURL(element.toString()).getDownloadURL().then((url) => {
                                    if (imageurl[i] !== url) {
                                        imageName.push(element.name)
                                        imageurl.push(url)
                                    }
                                })
                                this.setState({
                                    imageName: imageName,
                                    imageurl: imageurl
                                }, () => {
                                    console.log(imageName, imageurl)
                                })
                            }
                        }

                    } else if (!this.state.imageName.length) {
                        storage.refFromURL(element.toString()).getDownloadURL().then((url) => {
                            imageName.push(element.name)
                            imageurl.push(url)
                            this.setState({
                                imageName,
                                imageurl
                            }, () => {
                                console.log(this.state.imageName, this.state.imageurl)
                            })
                        })


                    }
                })
            })

        }
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.flexDiv}>
                {this.props.arr.length ?
                    this.props.arr.map((value , i) => {
                        return (
                            <ButtonBase
                                onClick={() => this.route(value.ResturentName)}
                                focusRipple
                                key={i}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                // className={classes.card}
                                style={{
                                    width: '30%',
                                    marginTop: '12px',
                                }}
                            >
                                {this.state.imageName ?
                                    this.state.imageName.map((name, index2) => {
                                        if (name == value.ResturentName) {
                                            return (
                                                <span
                                                    className={classes.imageSrc}
                                                    style={{
                                                        backgroundImage: `url(${this.state.imageurl[index2]})`,
                                                    }}
                                                />
                                            )
                                        }
                                    }) : null}

                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        {value.ResturentName}
                                        <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                            // <Card onClick={() => this.route(value.ResturentName)} className={classes.card}>
                            //     <CardActionArea>
                            //         {this.state.imageName ?
                            //             this.state.imageName.map((name, index2) => {
                            //                 if (name == value.ResturentName) {
                            //                     return (
                            //                         <CardMedia
                            //                             component="img"
                            //                             height="280"
                            //                             image={this.state.imageurl[index2]}
                            //                         />
                            //                     )
                            //                 }
                            //             }) : null}
                            //         <CardContent>
                            //             <Typography gutterBottom variant="h5" component="h2">
                            //                 {value.ResturentName}
                            //             </Typography>
                            //             <Typography variant="body2" color="textSecondary" component="p">
                            //                 Deliver Charges : {value.cash}
                            //             </Typography>
                            //             <Typography color="textSecondary" component="p">
                            //                 city : {value.city}
                            //             </Typography>
                            //             <Typography color="textSecondary" component="p">
                            //                 area : {value.area}
                            //             </Typography>
                            //         </CardContent>
                            //     </CardActionArea>
                            // </Card>
                        )
                    })
                    :
                    this.props.data ?
                        Object.values(this.props.data).map((value, i) => {
                            return (
                                <ButtonBase
                                    onClick={() => this.route(value.ResturentName)}
                                    focusRipple
                                    key={i}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    // className={classes.card}
                                    style={{
                                        width: '30%',
                                        marginTop: '12px',
                                    }}
                                >
                                    {this.state.imageName ?
                                        this.state.imageName.map((name, index2) => {
                                            if (name == value.ResturentName) {
                                                return (
                                                    <span
                                                        className={classes.imageSrc}
                                                        style={{
                                                            backgroundImage: `url(${this.state.imageurl[index2]})`,
                                                        }}
                                                    />
                                                )
                                            }
                                        }) : null}

                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                        >
                                            {value.ResturentName}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>
                                // <Card className={classes.card}>
                                //     <div className={classes.details}>
                                //         <CardContent>
                                //             <Typography gutterBottom variant="h5" component="h2">
                                //                 
                                //             </Typography>
                                //             <Typography variant="body2" color="textSecondary" component="p">
                                //                 Deliver Charges : {value.cash}
                                //             </Typography>
                                //             <Typography color="textSecondary" component="p">
                                //                 city : {value.city}
                                //             </Typography>
                                //             <Typography color="textSecondary" component="p">
                                //                 area : {value.area}
                                //             </Typography>
                                //         </CardContent>
                                //     </div>

                                // </Card>
                            )
                        }) : null
                }


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