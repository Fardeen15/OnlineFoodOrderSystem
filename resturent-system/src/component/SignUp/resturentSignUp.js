import React from 'react'
import { Dialog, DialogTitle, Button, DialogContentText, DialogContent, ListItemText, Slide } from '@material-ui/core'
import { Form, Icon, Input, Checkbox, message } from 'antd';
import { auth, db } from '../../firebaseConfige';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class ResturentSignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: "",
            email: "",
            password: "",
            city: "",
            area: "",
            cash: ""
        }
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })
    }
    submit = () => {
        if (this.state.Name && this.state.email && this.state.password && this.state.city && this.state.area && this.state.cash) {
            auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
                auth.onAuthStateChanged((user)=>{
                    if(user){
                        var obj = {
                            id : user.uid,
                            ResturentName: this.state.Name,
                            email: this.state.email,
                            password: this.state.password,
                            city: this.state.city,
                            area: this.state.area,
                            cash: this.state.cash,
                            category:'resturant'
                        }
                        db.ref().child('wholeData').child('resturents').child(user.uid).set(obj).then(()=>{
                            message.success('your account is created succesfully')
                            this.props.close()
                            this.props.close2()
                            auth.signOut()
                        })
                    }
                })
            }).catch((err)=>{
                message.error(err.message)
            })
        }else{
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
                                placeholder="Resturent Name"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.email}
                                onChange={(ev) => { this.getValue(ev, 'email') }}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
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
                            <Input
                                value={this.state.city}
                                onChange={(ev) => { this.getValue(ev, 'city') }}
                                prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="City"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.area}
                                onChange={(ev) => { this.getValue(ev, 'area') }}
                                prefix={<Icon type="question" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Area"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.cash}
                                onChange={(ev) => { this.getValue(ev, 'cash') }}
                                prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Delivery Charges"
                            />
                        </Form.Item>
                        <Form.Item>

                            <Button onClick = {this.submit} type="primary" htmlType="submit" className="login-form-button">
                                SignUp
                             </Button>
                        </Form.Item>

                    </Form>

                </DialogContent>
            </Dialog>
        )
    }
}
export default ResturentSignUp