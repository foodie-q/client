import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'

export default class Payment extends Component {
  changeToCurrency(input) {
    return 'Rp ' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  getSubtotal(list) {
    let subtotal = 0
    list.forEach(l => {
      subtotal += (l.title.length * 1000) * l.order
    })
    return (<Text style={{ flex: 1, fontSize: 22 }}>
      Subtotal = {this.changeToCurrency(subtotal)}
    </Text>)
  }

  render() {
    const { navigation } = this.props
    let orders = navigation.getParam('orders')

    orders = orders.filter(el => {
      return el.order !== 0
    })


    return (
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Your Orders</Text>
        <View style={{ flex: 4, marginTop: 30 }}>
          <FlatList data={orders} renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 0.5 }}>{item.order}x</Text>
              <Text style={{ flex: 1.5 }}>{item.title}</Text>
              <Text style={{ flex: 1 }}>@{this.changeToCurrency(item.title.length * 1000)}</Text>
            </View>
          )}
            keyExtractor={(item) => item.recipe_id}
          />
        </View>
        <Text>Estimated Time : </Text>
        {this.getSubtotal(orders)}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'orange', width: '35%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>PAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
