import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTurnNumber = this.onChangeTurnNumber.bind(this);
        this.onChangeTurnTime = this.onChangeTurnTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            TurnNumber: '',
            MinutesLeft: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4005/turns/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    TurnNumber: response.data.TurnNumber,
                    MinutesLeft: response.data.MinutesLeft
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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
        const obj = {
            TurnNumber: this.state.TurnNumber,
            MinutesLeft: this.state.MinutesLeft
        };
        axios.post('http://localhost:4005/turns/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <>
            <Modal.Header closeButton>
                    <Modal.Title>Edit Turn</Modal.Title>
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
                                <input  type="number"
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
            </>
        )
    }
}