import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

export default class CreateTurn extends Component {

    constructor(props) {
        super(props);

        this.onChangeTurnNumber = this.onChangeTurnNumber.bind(this);
        this.onChangeTurnTime = this.onChangeTurnTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            TurnNumber: '',
            MinutesLeft: '',
            show: false
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    onChangeTurnNumber(e) {
        this.setState({
            TurnNumber: e.target.value
        });
    }

    onChangeTurnTime(e) {
        this.setState({
            MinutesLeft: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newTurn = {
            TurnNumber: this.state.TurnNumber,
            MinutesLeft: this.state.MinutesLeft,
            show: false
        }

        axios.post('http://localhost:4005/turns/add', newTurn)
            .then(res => console.log(res.data));

        this.setState({
            TurnNumber: '',
            MinutesLeft: '',
            show: false
        })
    }

    render() {
        return (
            <>
            <Modal.Header closeButton>
                    <Modal.Title>Create Turn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Turn Number: </label>
                                <input  type="number"
                                    className="form-control"
                                    value={this.state.TurnNumber}
                                    onChange={this.onChangeTurnNumber}
                                />
                        </div>
                        <div className="form-group">
                            <label>Estimate Time: </label>
                                <input  type="text"
                                    className="form-control"
                                    value={this.state.MinutesLeft}
                                    onChange={this.onChangeTurnTime}
                                />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Save Changes
                    </Button>
            </Modal.Footer>
            
            {/*<div style={{marginTop: 20}}>
                <h3>Create New Turn</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Turn Number: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.turnNumber}
                                onChange={this.onChangeTurnNumber}
                                />
                    </div>
                    <div className="form-group">
                        <label>Estimate Time: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.minutesLeft}
                                onChange={this.onChangeTurnTime}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Turn" className="btn btn-primary" />
                    </div>
                </form>
        </div>*/}
        </>
        )
    }
}