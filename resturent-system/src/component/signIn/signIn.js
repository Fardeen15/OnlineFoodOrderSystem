import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { Form, Icon, Input, Checkbox, message } from 'antd';
import img1 from './backgorund.png'
import SignUp from '../SignUp/infoDailog';
import { auth } from '../../firebaseConfige';
import { connect } from 'react-redux'
import { getdata } from '../../action';
import { withRouter } from 'react-router-dom'
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
class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            signup: false,
            email: "",
            password: ""
        }
    }
    handlechange = () => {
        this.setState({
            signup: !this.state.signup
        })
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })
    }
    submit = () => {
        if (this.state.email && this.state.password) {

            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                this.props.getdata()
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        var data = Object.values(this.props.data)
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            if (Object.keys(data[i]) == user.uid) {
                                if (Object.values(data[i])[0].category == 'user') {
                                    this.props.history.push('/mainpage')
                                }else{
                                    this.props.history.push('/Home')
                                }
                            }
                        }

                    }
                    message.success('logIN Succesfully')
                })
            }).catch((err) => {
                message.error(err.message)
            })
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.getdata()
            }
        })
    }
    componentWillReceiveProps() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var data = Object.values(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    if (Object.keys(data[i]) == user.uid) {
                        if (Object.values(data[i])[0].category == 'user') {
                            this.props.history.push('/mainpage')
                        }else{
                            this.props.history.push('/Home')
                        }
                    }
                }

            }
        })
    }

    render() {
        
        const { classes } = this.props
        return (
            <Paper className={classes.main} style={{ backgroundImage: `url(${img1})` }}>

                <Paper className={classes.root}>
                    <Paper className={classes.div2}>
                        <Paper className={classes.detail}>
                            <h1>paper 1</h1>
                            <p>
                                jasdkafjjkosdhfjsdhfsdj;hfasdf
                                fsdifsdfhsdko'f
                                fdashfasdjkfhskofh
                                fjiasdghfgfbh
                                dfbasdjifhbasdj
                                dfjiasdfhsdof
                                fbasdjifnhasd['
                                sdiokfhasdkofjsd
                                fdjfasdophjufsdkfsd
                                dsfsdj']
                            </p>
                        </Paper>
                    </Paper>
                    <Paper className={classes.div3}>
                        <Paper className={classes.form}>
                            <h1 style={{ textAlign: 'center' }}>SignIn</h1>
                            <Form className="login-form">
                                <Form.Item>
                                    <Input
                                        value={this.state.email}
                                        onChange={(ev) => { this.getValue(ev, 'email') }}
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="email"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        value={this.state.password}
                                        onChange={(ev) => { this.getValue(ev, 'password') }}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>

                                    <Button onClick={this.submit} type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                </Button>
                                    Or <Button onClick={this.handlechange}>register now!</Button>
                                </Form.Item>
                            </Form>
                        </Paper>
                    </Paper>
                </Paper>
                {
                    this.state.signup ?
                        <SignUp close={this.handlechange} open={this.state.signup} />
                        : null
                }
            </Paper>

        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(SignIn)))