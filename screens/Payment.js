import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import {createOrder} from '../store/actions/api'

class Payment extends Component {
  state = {
    fromOrderHistory: false,
    orders: [],
    payButton: <TouchableOpacity
      onPress={() => this.submitPay()}
      style={{backgroundColor: 'orange', width: '35%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20}}>
      <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>PAY</Text>
    </TouchableOpacity>
  }

  componentDidMount() {
    const {navigation} = this.props;
    let orders = navigation.getParam('orders');

    try {
      if (navigation.state.routeName === 'OrdersPaymentDetail' && orders && orders[0].quantity) {
        orders = orders.filter(el => {
          return el.quantity !== 0
        })
      } else {
        orders = orders.filter(el => {
          return el.order !== 0
        });

        orders = orders.map(order => {
          return {
            id: order.id,
            quantity: order.order,
            name: order.name,
            price: order.price,
            status: 0,
            notes: ''
          }
        })
      }
      this.setState({
        fromOrderHistory: navigation.state.routeName === 'OrdersPaymentDetail',
        orders
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  changeToCurrency(input) {
    return 'Rp ' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  getSubtotal() {
    let subtotal = 0
    this.state.orders.forEach(l => {
      subtotal += l.price * l.quantity
    })

    return (<Text style={{flex: 1, fontSize: 22}}>
      Subtotal = {this.changeToCurrency(subtotal)}
    </Text>)
  }

  async submitPay() {
    let objCreate = {
      // userId: 'LgGX3gRskZcbvVrPjFGms9IWXIO2',
      userId: 'AeMLsz3FUDXFgvI0tnMfD0CUHOo2',
      menus: this.state.orders,
      createdAt: new Date(),
      status: 0
    }

    let subtotal = 0
    this.state.orders.forEach(l => {
      subtotal += l.price * l.quantity
    })

    if (subtotal > Number(this.props.saldo.replace(/[^0-9]+/g, ""))) {
      Alert.alert('Your balance is not enough to complete the order')
    } else {
      this.setState({payButton: <ActivityIndicator size='large' color='#f64747'/>})
      await this.props.createOrder(objCreate)
    }

    if (!this.props.loadingCreate) {
      this.props.navigation.navigate('Home')
    }

  }

  render() {
    const {fromOrderHistory} = this.state;
    return (
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 30}}>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Your Orders</Text>
        <View style={{flex: 4, marginTop: 30}}>
          <FlatList data={this.state.orders} renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{flex: 0.5}}>{item.quantity}x</Text>
              <Text style={{flex: 1.5}}>{item.name}</Text>
              <Text style={{flex: 1}}>@{this.changeToCurrency(item.price)}</Text>
            </View>
          )}
                    keyExtractor={(item) => item.id}
          />
        </View>
        {
          !fromOrderHistory
          && <Text>Estimated Time : </Text>
        }
        {this.getSubtotal()}
        {
          !fromOrderHistory
          && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {this.state.payButton}
          </View>
        }

      </View>
    )
  }
}

const mapStateToProps = state => ({
  loadingCreate: state.api.loadingCreate,
  saldo: state.api.saldo
})

const mapDispatchToProps = dispatch => ({
  createOrder: (payload) => dispatch(createOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
