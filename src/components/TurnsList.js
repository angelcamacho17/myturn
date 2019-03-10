import React, {Component} from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import CreateTurn from './CreateTurn';
import axios from 'axios';

const Turn = props => (
    <tr>
        <td>{props.turn.TurnNumber}</td>
        <td>{props.turn.Next}</td>
        <td>{props.turn.Previous}</td>
        <td>{props.turn.MinutesLeft}</td>
        <td>
            <Link to={"/edit/"+props.turn._id}>Edit</Link>
        </td>
    </tr>
)

export default class TurnsList extends Component {

    constructor(props) {
        super(props);
        this.addturn = this.addturn.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            turns: [],
            createTurn:false
            };
    }

    addturn(){
        this.setState({createTurn:true})
    }
    
    handleClose() {
        this.setState({ createTurn: false });
    }

    componentDidMount() {
        axios.get('http://localhost:4005/turns/')
            .then(response => {
                this.setState({
                    turns: response.data,
                    createTurn:false});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    xcomponentWillUpdate() {
        axios.get('http://localhost:4005/turns/')
        .then(response => {
            this.setState({turns: response.data,
                            createTurn:false});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    turnList() {
        return this.state.turns.map(function(currentTurn, i) {
            return <Turn turn={currentTurn} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Turn List</h3>
                <Button variant="primary" onClick={this.addturn}>
                    Add Turn
                </Button>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Turn Number</th>
                            <th>Next</th>
                            <th>Previous</th>
                            <th>Minutes Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.turnList() }
                    </tbody>
                </table>
                <Modal show={this.state.createTurn} onHide={this.handleClose}>
                    <CreateTurn/>
                </Modal>
            </div>
        )
    }
}