import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode';

const { width } = Dimensions.get('window');

export default class OrdersQRCode extends Component {
  state = {
    text: "{userId:'919191919', table:'1'}",
  };

  componentDidMount() {
    this.setState({
      text: this.props.navigation.getParam('text')
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 20 }}>Please Show This Code to Our Waitress to Confirm Your Order</Text>
        <View>
          <QRCode
            value={this.state.text}
            size={width * 0.5}
            bgColor='black'
            fgColor='white' />
        </View>
      </View>
    )
  }
}
