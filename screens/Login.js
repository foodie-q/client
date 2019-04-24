import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../store/Auth/actions'
import LoginForm from '../components/LoginForm'
import {Icon} from "native-base";

class Login extends Component {
  static navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name={'person'}
        ios='ios-person' android="md-person" style={{color: `${tintColor}`}}/>
    )
  };

  render() {
    return (
      <LoginForm
        login={this.props.login}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => {
  return ({
    loading: state.Auth.loading,
  })
};

const mapDispatchtoProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(Login)
