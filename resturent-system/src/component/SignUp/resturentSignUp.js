import React from 'react'
import { Dialog, DialogTitle, Button, DialogContentText, DialogContent, ListItemText, Slide } from '@material-ui/core'
import { Form, Icon, Input, Checkbox, message, Upload } from 'antd';
import { auth, db, storage } from '../../firebaseConfige';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
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
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        var obj = {
                            id: user.uid,
                            ResturentName: this.state.Name,
                            email: this.state.email,
                            password: this.state.password,
                            city: this.state.city,
                            area: this.state.area,
                            cash: this.state.cash,
                            category: 'resturant'
                        }
                        db.ref().child('wholeData').child('resturents').child(user.uid).set(obj).then(() => {
                            storage.ref(`profileImages/${this.state.Name}`).put(this.state.url)
                            message.success('your account is created succesfully')
                            this.props.close()
                            this.props.close2()
                            auth.signOut()
                        })
                    }
                })
            }).catch((err) => {
                message.error(err.message)
            })
        } else {
            message.warning('please filled all fields')
        }
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    url : info.file.originFileObj,
                    loading: false,
                }, () => {
                    console.log(this.state.url)
                }),
            );
        }
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                        <Form.Item label="enter Resturent Logo / mainImage">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item>

                            <Button variant="contained" color="primary" onClick={this.submit} type="primary" htmlType="submit" className="login-form-button">
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