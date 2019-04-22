import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Button, FlatList, Modal, Alert } from 'react-native'
import { fetchMenus, orderFood, getSaldo } from '../store/actions/api'

class Menus extends Component {
  state = {
    orders: [],
    modalVisible: false,
    saldo: 0
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style={{ backgroundColor: 'orange', padding: 10, marginRight: 20, borderRadius: 20 }}>
          <Text style={{ color: '#fff' }}>{navigation.getParam('saldo')}</Text>
        </TouchableOpacity>
      ),
      headerLeft: null
    }
  }

  async componentDidMount() {
    await this.props.fetchMenus()
    await this.props.navigation.setParams({ saldo: this.props.saldo })
  }

  async componentWillMount() {
    await this.props.getSaldo()
  }


  changeToCurrency(input) {
    return 'Rp ' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  addToBasket(id, options) {
    this.props.orderFood(this.props.menus, id, options)
  }

  checkOrder() {
    let haveOrder = false
    this.props.menus.forEach(food => {
      if (food.order) {
        haveOrder = true
      }
    })

    if (haveOrder) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Payment', { orders: this.props.menus })}
          style={{
            backgroundColor: 'orange',
            marginTop: 10,
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20
          }}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 17 }}>View Basket</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View />)
    }
  }

  render() {
    let checkItem = (item) => {
      if (item.order) {
        return (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <TouchableOpacity
            onPress={this.addToBasket.bind(this, item.id, 'reduce')}
            style={{ backgroundColor: 'orange', width: 20, height: 20, borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>-</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', marginHorizontal: 10 }}>{item.order}</Text>
          <TouchableOpacity
            onPress={this.addToBasket.bind(this, item.id, 'add')}
            style={{ backgroundColor: 'orange', width: 20, height: 20, borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>+</Text>
          </TouchableOpacity>
        </View>)
      } else {
        return (<TouchableOpacity
          style={{ backgroundColor: 'orange', padding: 5, borderRadius: 10, marginTop: 20 }}
          onPress={this.addToBasket.bind(this, item.id, 'add')}>
          <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center' }}>
            ADD TO BASKET
          </Text>
        </TouchableOpacity>)
      }
    }
    return (
      this.props.isLoading ? <ActivityIndicator size='large' color='#f64747' /> :
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList data={this.props.menus} renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 15,
                  paddingHorizontal: 10
                }}
                key={item.id}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                <View style={{ flex: 1.5, paddingLeft: 10 }}>
                  <Text>{item.name}</Text>
                  <Text style={{ fontSize: 10, color: 'grey' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis.</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center' }}>{this.changeToCurrency(item.price)}</Text>
                  {checkItem(item)}
                </View>
              </TouchableOpacity>
            )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {
            this.checkOrder()
          }
          {/* <View style={{ flex: 0.5 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 22, height: '25%', borderWidth: 2 }}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View> */}
        </View>


    )
  }
}

const mapStateToProps = state => ({
  menus: state.api.menus,
  isLoading: state.api.isLoading,
  saldo: state.api.saldo
})

const mapDispatchToProps = dispatch => ({
  fetchMenus: () => dispatch(fetchMenus()),
  orderFood: (list, id, options) => dispatch(orderFood(list, id, options)),
  getSaldo: () => dispatch(getSaldo())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menus)