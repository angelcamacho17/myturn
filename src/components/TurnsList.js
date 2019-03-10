import React, {Component} from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import axios from 'axios';

const Turn = props => (
    <tr>
        <td>{props.turn.TurnNumber}</td>
        <td>{props.turn.Next}</td>
        <td>{props.turn.Previous}</td>
        <td>{props.turn.MinutesLeft}</td>
        {/*<td>
            <Link to={"/edit/"+props.turn._id}>Edit</Link>
        </td>*/}
    </tr>
)

export default class TurnsList extends Component {

    constructor(props) {
        super(props);
        this.state = {turns: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4005/turns/')
            .then(response => {
                this.setState({turns: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    xcomponentWillUpdate() {
        axios.get('http://localhost:4005/turns/')
        .then(response => {
            this.setState({turns: response.data});
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
            </div>
        )
    }
}