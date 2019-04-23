<<<<<<< HEAD
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View, TouchableOpacity, TouchableHighlight, StyleSheet} from 'react-native'
=======
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image } from 'react-native'
>>>>>>> temp
import localStorage from '../helpers/localStorage'
import {getSaldo} from '../store/actions/api'
import {Constants} from 'expo'

class Home extends Component {
  async componentWillMount() {
    this.props.getSaldo(await localStorage.getItem('userId'))
  }

  render() {
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <Text style={styles.appName}>
          {Constants.name}
        </Text>
=======
        <Image source={require('../assets/icon.png')} style={{ width: 300, height: 330, marginBottom: 30 }} />
>>>>>>> temp
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.props.navigation.navigate('ScanQR')}
        >
<<<<<<< HEAD
          <Text style={{textAlign: 'center', color: '#fff'}}>
=======
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
>>>>>>> temp
            SCAN QR CODE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.props.navigation.navigate('ReserveTable')}
        >
<<<<<<< HEAD
          <Text style={{textAlign: 'center', color: '#fff'}}>
=======
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
>>>>>>> temp
            RESERVE TABLE
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
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: '#f64747',
    borderRadius: 50
  }
})

const mapDispatchToProps = dispatch => ({
  getSaldo: (userId) => dispatch(getSaldo(userId))
})

export default connect(null, mapDispatchToProps)(Home)
