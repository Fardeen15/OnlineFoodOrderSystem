import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Input, Form } from 'antd';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import TextArea from 'antd/lib/input/TextArea';
class Description extends React.Component {
    constructor() {
        super()
        this.state = {
            quantity: "",
            extra: ""
        }
    }
    change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
        })
    }
    add = () => {
        var obj = {
            quantity: this.state.quantity,
            extra: this.state.extra
        }
        var data = this.props.data.value
        data.description = obj
        this.props.addItem(data, this.props.data.index)
        console.log(data)
        this.setState({
            quantity: "",
            extra: ""
        })
    }
    render() {
        return (
            <Dialog style={{ padding: "25px" }} fullWidth={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Enter Item Detail</DialogTitle>
                <DialogContent>

                    <Form>
                        <Form.Item label="Quantity">
                            <Input value={this.state.quantity} onChange={(ev) => this.change(ev, 'quantity')} />
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea value={this.state.extra} onChange={(ev) => this.change(ev, 'extra')} />
                        </Form.Item>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Form.Item>
                        <Button onClick={() => this.add()}>Add To Cart</Button>
                    </Form.Item>

                </DialogActions>


            </Dialog>
        )

    }
}
export default Description