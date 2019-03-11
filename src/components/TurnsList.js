import React, {Component} from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import CreateTurn from './CreateTurn';
import EditTurn from './EditTurn';
import axios from 'axios';
import Turn from './TurnRow'

export default class TurnsList extends Component {

    constructor(props) {
        super(props);
        this.handleAddturn = this.handleAddturn.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            turns: [],
            createTurn:false,
            editTurn:false
            };
    }

    handleAddturn(){
        this.setState({createTurn:true})
    }
    
    handleClose() {
        this.setState({ createTurn: false,
                        editTurn:false});
    }

    componentDidMount() {
        axios.get('http://localhost:4005/turns/')
            .then(response => {
                this.setState({
                    turns: response.data,
                    createTurn:false,
                    editTurn:false});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    xcomponentWillUpdate() {
        axios.get('http://localhost:4005/turns/')
        .then(response => {
            this.setState({
                turns: response.data,
                createTurn:false,
                editTurn:false});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    turnList() {
        return this.state.turns.map(function(currentTurn, i) {
            return (<Turn turn={currentTurn} key={i} />);
        });
    }

    render() {
        return (
            <div>
                <h3>Turn List</h3>
                <Button variant="primary" onClick={this.handleAddturn}>
                    Add Turn
                </Button>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Turn Number</th>
                            <th>Minutes Left</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.turnList() }
                    </tbody>
                </table>
                <Modal show={this.state.createTurn} onHide={this.handleClose}>
                    <CreateTurn/>
                </Modal>
                <Modal show={this.state.editTurn} onHide={this.handleClose}>
                    <EditTurn/>
                </Modal>
            </div>
        )
    }
}