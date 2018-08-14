import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/AppActions';
import {login} from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';

class Nav extends Component {
    render() {
        console.log(this.props);
        const navButtons = this.props.loggedIn ? (
            <div>
                <div className="user">
                    str
                </div>
                <Link to="/editor" className="btn btn--dash btn--nav">Editor</Link>
                {this.props.currentlySending ? (
                    <LoadingButton className="btn--nav"/>
                ) : (
                    <a href="#" className="btn btn--login btn--nav" onClick={::this._logout}>Logout</a>
                )}

            </div>
        ) : (
            <div>
                <Link to="/register" className="btn btn--login btn--nav">Register</Link>
                <Link to="/login" className="btn btn--login btn--nav">Login</Link>
            </div>
        );

        return (
            <div className="nav">
                <div className="nav__wrapper">
                    <Link to="/" className="nav__logo-wrapper"><h1 className="nav__logo">React App</h1></Link>
                    {navButtons}
                </div>
            </div>
        );
    }

    _logout() {
        this.props.dispatch(logout());
    }

}

Nav.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    currentlySending: React.PropTypes.bool.isRequired
};

export default Nav;
