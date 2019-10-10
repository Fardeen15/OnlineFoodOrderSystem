import React, { Children } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, message } from 'antd';
import { auth, db } from '../../firebaseConfige';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Icon, Input } from 'antd';
const { Option } = Select;
// let id = 0
class AddItemDailog extends React.Component {
    constructor() {
        super()
        this.state = {
            val: "",
            item: "",
            expanded: false,
            id: 0,
            obj: {},
            name : "",
            price : ""
        }

    }
    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var data = Object.values(this.props.data)
                var key = Object.keys(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    if (key[i] == user.uid && data[i].subItems) {
                        this.setState({
                            obj: data[i]
                        })
                    }
                }
            }
        })
    }
    handleChange = (panel) => {
        if (this.state.expanded == panel) {
            this.setState({
                expanded: false
            })
        } else {

            this.setState({
                expanded: panel
            })
        }
    }
    setData = ()=>{
        auth.onAuthStateChanged((user) => {
            var obj = {
                name  :this.state.name,
                price : this.state.price,
                subitem : this.state.item
            }
            if (user) {
                var data = Object.values(this.props.data)
                var key = Object.keys(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    if (key[i] == user.uid) {
                        db.ref().child('wholeData').child('resturents').child(user.uid).child('item').child(this.state.item).child(obj.name).set(obj).then(()=>{
                            this.setState({id : ""})
                        })
                    }
                }
            }
        })
    }
    change = (ev, val)=>{
        this.setState({
            [val]  : ev.target.value
        })
    }
    inputs = () => {
        var arr = []
        for (var i = 0; i < this.state.id; i++) {
            arr.push(<Form >
            <Form.Item>
                <Input
                onChange = {(ev)=>this.change(ev,'name')}
                  prefix={<Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter Dish Name"
                />,
              
            </Form.Item>
            <Form.Item >
             
                <Input
                onChange = {(ev)=>this.change(ev,'price')}
                  prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Enter Price"
                />,
              
            </Form.Item>
            <Form.Item>
            <Button onClick={this.setData} type="primary" htmlType="submit">
                add
              </Button> 
              <Button onClick={()=>this.setState({id : this.state.id - 1})} type="primary" htmlType="submit">
                cancel
              </Button>
            </Form.Item>
          </Form>)

        }
        return arr.map((value) => {
            return value
        })
    }
    render() {
        return (
            <div>
                <Dialog
                    fullScreen={true}
                    // fullWidth={true}
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Add Items</DialogTitle>
                    <DialogContent>
                        {this.state.obj.subItems ?
                            this.state.obj.subItems.map((value , index) => {
                                return (

                                    <ExpansionPanel key = {index} square expanded={this.state.expanded === value} onChange={() => this.handleChange(value)}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography>{value}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails style={{display:'block'}}>
                                           
                                            {this.state.obj.item ? 
                                                Object.values(this.state.obj.item).map((item)=>{
                                                   return Object.values(item).map((item2 , index2)=>{
                                                        if(item2.subitem == value){
                                                            return <Typography><b>Dish{index2 + 1}</b> : {item2.name} <b>price</b> : {item2.price}</Typography>
                                                        }
                                                    })
                                                })
                                                :null}
                                            {this.state.item == value ?
                                                this.inputs(index)
                                                : null}
                                            <Button disabled = {this.state.id ? true : false} onClick={() => { this.setState({ item: value, id: this.state.id + 1 }) }}>Add Items</Button>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )

                            })
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close} color="primary">
                            Disagree
                        </Button>
                        <Button color="primary" autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }

}


const mapStateToProps = (state) => {
    return {
        data: state.resturents,
    }
}
const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddItemDailog)