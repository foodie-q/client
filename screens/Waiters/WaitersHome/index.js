import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Constants} from 'expo'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import localStorage from '../../../helpers/localStorage'
import {getSaldo} from '../../../store/actions/api'

class WaitersHome extends Component {
  async componentWillMount() {
    this.props.getSaldo(await localStorage.getItem('userId'))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>
          {Constants.name}
        </Text>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.props.navigation.navigate('WaitersBooking')}
        >
          <Text style={{textAlign: 'center', color: '#fff'}}>
            SCAN QR CODE
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableOpacity: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#f64747',
    borderRadius: 50
  },
  appName: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 42,
    color: '#f64747'
  }
})

const mapDispatchToProps = dispatch => ({
  getSaldo: (userId) => dispatch(getSaldo(userId))
})

export default connect(null, mapDispatchToProps)(WaitersHome)
