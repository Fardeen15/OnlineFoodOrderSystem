import React from 'react'
import { Dialog, DialogTitle, Button, DialogContentText, DialogContent, ListItemText, Slide } from '@material-ui/core'
import { Form, Icon, Input, Checkbox, message } from 'antd';
import { auth, db } from '../../firebaseConfige';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class UserSignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: "",
            SignUpemail: "",
            SignUppassword: "",
            number: "",
        }
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })
    }
    submit = () => {
        if (this.state.Name && this.state.SignUpemail && this.state.SignUppassword) {
            auth.createUserWithEmailAndPassword(this.state.SignUpemail, this.state.SignUppassword).then(() => {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        if (this.state.number.length == 11) {

                            var obj = {
                                id: user.uid,
                                fullname: this.state.Name,
                                email: this.state.SignUpemail,
                                password: this.state.SignUppassword,
                                number: this.state.number,
                                category: 'user'
                            }
                            db.ref().child('wholeData').child('user').child(user.uid).set(obj).then(() => {
                                this.setState({
                                    number : "",
                                    Name: "",
                                    SignUpemail: "",
                                    SignUppassword: "",
                                })
                                message.success('your account is created succesfully')
                                this.props.close()
                                this.props.close2()
                                // auth.signOut()
                            })
                        }

                    }
                })
            }).catch((err) => {
                message.error(err.message)
            })
        } else {
            message.warning('please filled all fields')
        }
    }
    render() {
        return (
            <Dialog TransitionComponent={Transition}
                keepMounted
                maxWidth="sm"
                fullWidth={true}
                onClose={this.props.close}
                aria-labelledby="form-dialog-title"
                open={this.props.open}>
                <DialogTitle style={{ textAlign: "center" }} id="simple-dialog-title">account SignUP Form</DialogTitle>
                <DialogContent>
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                value={this.state.Name}
                                onChange={(ev) => { this.getValue(ev, 'Name') }}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Full Name"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.SignUpemail}
                                onChange={(ev) => { this.getValue(ev, 'SignUpemail') }}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="email"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.SignUppassword}
                                onChange={(ev) => { this.getValue(ev, 'SignUppassword') }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.number}
                                onChange={(ev) => { this.getValue(ev, 'number') }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="number"
                                placeholder="number"
                            />
                        </Form.Item>
                        <Form.Item>

                            <Button onClick={this.submit} type="primary" htmlType="submit" className="login-form-button">
                                SignUp
                             </Button>
                        </Form.Item>

                    </Form>

                </DialogContent>
            </Dialog>
        )
    }
}
export default UserSignUp