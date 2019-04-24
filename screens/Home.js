import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import localStorage from '../helpers/localStorage'
import { findUser } from '../store/actions/api'

class Home extends Component {
  async componentDidMount() {
    this.props.findUser(await localStorage.getItem('userId'))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/icon.png')} style={{ width: 300, height: 350, marginBottom: 30 }} />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.props.navigation.navigate('ScanQR')}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
            SCAN QR CODE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.props.navigation.navigate('ReserveTable')}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
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
});

const mapDispatchToProps = dispatch => ({
  findUser: (userId) => dispatch(findUser(userId))
});

export default connect(null, mapDispatchToProps)(Home)
