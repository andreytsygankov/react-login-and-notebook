import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form from '../Form.react';
import auth from '../../utils/auth';
import { login } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.react';

export default class LoginPage extends Component {
	render() {
		const dispatch = this.props.dispatch;
		const { formState, currentlySending } = this.props.data;
    return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Login</h2>
					</div>

		    	<Form data={formState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._login} btnText={"Login"} currentlySending={currentlySending}/>
				</div>
			</div>
		);
  }

	_login(username, password) {
		this.props.dispatch(login(username, password));
	}
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(LoginPage);
