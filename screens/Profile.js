import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { findUser } from '../store/actions/api'
import localStorage from '../helpers/localStorage'

class Profile extends Component {
  async componentDidMount() {
    this.props.findUser(await localStorage.getItem('userId'))
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingVertical: 30 }}>
        <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} style={{ width: 100, height: 100, marginBottom: 20 }} />
        <Text>{this.props.user.name}</Text>
        <Text>{this.props.user.email}</Text>
        <Text>{this.props.saldo}</Text>
        <TouchableOpacity style={{ backgroundColor: 'orange', padding: 10, borderRadius: 20, marginTop: 10 }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            TOP UP BALANCE
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.api.user,
  saldo: state.api.saldo
})

const mapDispatchToProps = dispatch => ({
  findUser: (userId) => dispatch(findUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)