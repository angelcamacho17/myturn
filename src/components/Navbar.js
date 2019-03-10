import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component{
    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }
    render (){
        const loginRegLink = (
        <ul className="navbar-nav">
                <li className="nav-item">
                     <Link to="/login" className="nav-link">
                        Login
                     </Link>
                </li>
                <li className="nav-item">
                     <Link to="/register" className="nav-link">
                        Register
                     </Link>
                </li>
            </ul>
        )
        const userLink = (
    
        <ul className="navbar-nav">
                <li>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                     <Link to="/profile" className="nav-link">
                        Profile
                     </Link>
                </li>
                <li>
                    <Link to="/turn" className="nav-link">
                        Turn List
                    </Link>
                </li>
                <li className="nav-item">
                     <Link to="/create" className="nav-link">
                        Create Turn
                     </Link>
                </li>
                <li className="nav-item">
                    <Link onClick={this.logOut.bind(this)} className="nav-link" to="/login">
                        Log Out
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/popup">
                        Popup 
                    </Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navbar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>

        </nav>
        )
    }
}

export default withRouter(Navbar);