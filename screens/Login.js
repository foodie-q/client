import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../store/Auth/actions'
import LoginForm from '../components/LoginForm'

const personImage = require('../assets/ic_person_outline.png')

class Login extends Component {
  static navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={personImage}
        style={{tintColor: tintColor}}
      />
    )
  }

  render() {
    return (
      <LoginForm
        login={this.props.login} />
    )
  }
}



const mapDispatchtoProps = (dispatch) => bindActionCreators({
  login
}, dispatch)

export default connect(null, mapDispatchtoProps)(Login)