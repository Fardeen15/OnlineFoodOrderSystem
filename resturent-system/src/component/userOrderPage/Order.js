import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, message, Empty } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { auth, db, storage } from '../../firebaseConfige';
import { datefn } from '../../action';
const Styles = theme => ({

    OrderForm: {
        left: "39%",
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            position: "relative",
            left: "25%",
            transform: "translate(-50%, 10px)",
        }
    },
    imgDiv:{
        display : 'none',
        [theme.breakpoints.up('sm')]: {
            display : 'block',
        }
    },
    mainDiv:{
        display : 'block',
        [theme.breakpoints.up('sm')]: {
            display : 'flex',
        }
    }
});

class OrderPage extends React.Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
            data: "",
            order: "",
            address: "",
            number: "",
            imageurl: ""
        };
    }
    componentWillMount() {
        if (this.props.data) {
            Object.values(this.props.data).map((value) => {
                if (this.props.match.params.id == value.ResturentName) {
                    this.setState({
                        data: value
                    })
                    console.log(value)
                }
            })
        } else {
            this.props.history.push('/mainpage')
        }

    }
    chnage = (ev, val) => {
        this.setState({ [val]: ev.target.value })
    }
    addOrder = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var obj = {
                    name: this.props.user[user.uid].fullname,
                    id: user.uid,
                    resturentId: this.state.data.id,
                    order: this.state.order,
                    address: this.state.address,
                    number: this.state.number
                }

                db.ref().child('wholeData').child('resturents').child(this.state.data.id).child('newOrder').child(datefn()).set(obj).then(() => {
                    message.success('your order send ThankYou!')
                    this.setState({
                        order: "",
                        address: "",
                        number: ""
                    })
                })
            }
        })
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.images) {
            let { imageurl } = this.state
            this.props.images.items.forEach(element => {
                if (this.props.match.params.id === element.name) {
                    storage.refFromURL(element.toString()).getDownloadURL().then((url) => {

                        this.setState({
                            imageurl: url
                        }, () => {
                            console.log(this.state.imageurl)
                        })

                    })
                }

            })


        }
    }

    render() {
        console.log(this.props)

        const { formLayout } = this.state;
        const { classes } = this.props;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 10 },
                }
                : null;
        return (
            <div className={classes.mainDiv} style={{ display: 'flex', }}>
                <div className={classes.imgDiv} style={{ width: '44%', }}>
                    {this.state.imageurl ?
                        <img style={{ width: '70%', }} src={this.state.imageurl ? this.state.imageurl : null} />
                        : <Empty description={'no images yet'} />}
                </div>
                <Form className={classes.OrderForm} layout={formLayout}>
                    <Form.Item label="Resturant Name" {...formItemLayout}>
                        <Input value={this.props.match.params.id} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Branch Name" {...formItemLayout}>
                        <Input value={this.state.data ? this.state.data.area + " " + this.state.data.city : ""} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Your Order with (quantity/falvour)" {...formItemLayout}>
                        <TextArea value={this.state.order} onChange={(ev) => this.chnage(ev, 'order')} />
                    </Form.Item>
                    <Form.Item label="Your address" {...formItemLayout}>
                        <Input value={this.state.address} onChange={(ev) => this.chnage(ev, 'address')} />
                    </Form.Item>
                    <Form.Item label="Your Phone Number" {...formItemLayout}>
                        <Input value={this.state.number} onChange={(ev) => this.chnage(ev, 'number')} />
                    </Form.Item>
                    <Form.Item label="Delivery charges" {...formItemLayout}>
                        <Input value={this.state.data ? this.state.data.cash : ""} disabled={true} />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button onClick={this.addOrder} type="primary" {...formItemLayout}>Submit</Button>  <Button onClick={() => this.props.history.push('/mainpage')} type="secondary" {...formItemLayout}>cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,
        user: state.user,
        images: state.ProfileImages
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(OrderPage)))