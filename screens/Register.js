import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../store/Auth/actions'
import RegisterForm from '../components/RegisterForm'
import {Icon} from "native-base";

const personImage = require('../assets/ic_person_add.png')

class Register extends Component {
  static navigationOptions = {
    tabBarLabel: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Icon ios='ios-person-add' android="md-person-add" style={{color: tintColor, tintColor: tintColor}}/>
    )
  }

  render() {
    return (
      <RegisterForm
        register={this.props.register}
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
  register
}, dispatch)

export default connect(mapStateToProps, mapDispatchtoProps)(Register)
