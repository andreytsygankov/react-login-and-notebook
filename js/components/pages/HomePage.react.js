import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<article>
				<div>
					<section className="text-section">
						{loggedIn ? (
							<div>
								<h1>Welcome to Notes Editor, you are logged in!</h1>
								<Link to="/editor" className="btn btn--dash">Editor</Link>
							</div>
						) : (
							<div>
								<h1>Welcome to Notes Editor!</h1>
								<div>
									<Link to="/login" className="btn btn--login">Login</Link>
									<Link to="/register" className="btn btn--register">Register</Link>
								</div>
							</div>
						)}
					</section>
				</div>
			</article>
		);
  }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(HomePage);
