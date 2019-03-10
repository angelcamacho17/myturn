import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTurn extends Component {

    constructor(props) {
        super(props);

        this.onChangeTurnNumber = this.onChangeTurnNumber.bind(this);
        this.onChangeTurnResponsible = this.onChangeTurnResponsible.bind(this);
        this.onChangeTurnPriority = this.onChangeTurnPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            turn_description: '',
            turn_responsible: '',
            turn_priority: '',
            turn_completed: false
        }
    }

    onChangeTurnNumber(e) {
        this.setState({
            turn_description: e.target.value
        });
    }

    onChangeTurnResponsible(e) {
        this.setState({
            turn_responsible: e.target.value
        });
    }

    onChangeTurnPriority(e) {
        this.setState({
            turn_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Turn Description: ${this.state.turn_description}`);
        console.log(`Turn Responsible: ${this.state.turn_responsible}`);
        console.log(`Turn Priority: ${this.state.turn_priority}`);
        console.log(`Turn Completed: ${this.state.turn_completed}`);

        const newTurn = {
            turn_description: this.state.turn_description,
            turn_responsible: this.state.turn_responsible,
            turn_priority: this.state.turn_priority,
            turn_completed: this.state.turn_completed
        }

        axios.post('http://localhost:4005/turns/add', newTurn)
            .then(res => console.log(res.data));

        this.setState({
            turn_description: '',
            turn_responsible: '',
            turn_priority: '',
            turn_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Turn</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Turn Number: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.turn_description}
                                onChange={this.onChangeTurnNumber}
                                />
                    </div>
                    <div className="form-group">
                        <label>Next: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.turn_responsible}
                                onChange={this.onChangeTurnResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <label>Previous: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.turn_responsible}
                                onChange={this.onChangeTurnResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Turn" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}