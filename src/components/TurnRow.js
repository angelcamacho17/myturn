import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export default class TurnRow extends Component{
    
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            turn:'',
            number: '',
            time:'',
            show : false
        }
    }

    componentDidMount() {
        this.setState({
            number: this.props.turn.TurnNumber,
            time: this.props.turn.MinutesLeft
        })
    }

    handleShow(){
        this.setState({ show: true})
    }

    handleClose(){
        this.setState({ show: false})
    }

    render(){
        return(
            <tr>
                <td>{this.state.number}</td>
                <td>{this.state.time}</td>
                <td>    
                    <Button variant="info" onClick={this.handleShow}>
                        Edit
                    </Button>
                </td>
            </tr>
        )
    }

}