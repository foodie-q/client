import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dimensions, Text, TouchableOpacity, View} from 'react-native'
import {Icon} from 'native-base'
import localStorage from '../helpers/localStorage'

import {NavigationActions, StackActions} from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'AuthLogin'})],
});

const {width} = Dimensions.get('window');

class Profile extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingVertical: 30}}>
        <View
          style={{
            backgroundColor: '#f64747',
            borderRadius: 80,
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Icon
            ios={'ios-contact'} android={'md-contact'}
            style={{fontSize: 90, color: 'white'}}
            name={'profile-avatar'}
          />
        </View>
        <Text>{this.props.user.name}</Text>
        <Text>{this.props.user.email}</Text>
        <Text>{this.props.saldo}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TopUpSaldo')}
          style={{backgroundColor: '#f64747', padding: 10, borderRadius: 20, marginTop: 10, width: 300}}>
          <Text style={{textAlign: 'center', color: '#fff'}}>
            TOP UP BALANCE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await localStorage.clear();
            this.props.navigation.dispatch(resetAction)
          }}
          style={{backgroundColor: '#f64747', padding: 10, borderRadius: 20, marginTop: 25, width: 300}}>
          <Text style={{textAlign: 'center', color: '#fff'}}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.api.user,
  saldo: state.api.saldo
});

export default connect(mapStateToProps)(Profile)
