import React, { Component } from 'react'
import { Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createBalance } from "../store/actions/api";
import localStorage from '../helpers/localStorage'

class TopUpSaldo extends Component {
  state = {
    nominal: ''
  }

  handleChange = (key) => (val) => {
    this.setState({
      [key]: val
    })
  }

  async submitTopUp() {
    await this.props.createBalance({
      userId: await localStorage.getItem('userId'),
      createdAt: new Date(),
      money: this.state.nominal,
      status: 1,
    })

    if (!this.props.loadingBalance) {
      this.props.navigation.navigate('Profile')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Input Your TOP UP Nominal</Text>
        <TextInput
          style={{}}
          placeholder="Name"
          returnKeyType="next"
          keyboardType="decimal-pad"          
          autoCapitalize="none"
          onChangeText={this.handleChange('nominal')}
          value={this.state.nominal}
        />
        <TouchableOpacity
          onPress={() => this.submitTopUp()}
        >
          <Text>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const mapStateToProps = state => ({
  balanceHistory: state.api.balanceHistory,
  loadingBalanceHistory: state.api.loadingBalanceHistory,
  loadingBalance: state.api.loadingBalance,
})

const mapDispatchToProps = dispatch => ({
  createBalance: (objCreate) => dispatch(createBalance(objCreate))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopUpSaldo)