import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../store/Auth/actions'
import LoginForm from '../components/LoginForm'
import {Icon} from "native-base";

const personImage = require('../assets/ic_person_outline.png');

class Login extends Component {
  static navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({tintColor}) => (
      <Icon ios='ios-person' android="md-person" style={{color: tintColor, tintColor: tintColor}}/>
    )
  };

  render() {
    return (
      <LoginForm
        login={this.props.login}/>
    )
  }
}


const mapDispatchtoProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default connect(null, mapDispatchtoProps)(Login)
