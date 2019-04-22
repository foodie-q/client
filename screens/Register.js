import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../store/Auth/actions'
import RegisterForm from '../components/RegisterForm'

const personImage = require('../assets/ic_person_add.png')

class Register extends Component {
  static navigationOptions = {
    tabBarLabel: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={personImage}
        style={{tintColor: tintColor}}
      />
    )
  }

  render() {
    return (
      <RegisterForm
        register={this.props.register} />
    )
  }
}



const mapDispatchtoProps = (dispatch) => bindActionCreators({
  register
}, dispatch)

export default connect(null, mapDispatchtoProps)(Register)