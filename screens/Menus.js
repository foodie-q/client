import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native'
import { fetchMenus, orderFood } from '../store/actions/api'

class Menus extends Component {
  state = {
    orders: [],
    modalVisible: false,
    saldo: 0,
    from: '',
    notes: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style={{ backgroundColor: '#f64747', padding: 10, marginRight: 20, borderRadius: 20 }}>
          <Text style={{ color: '#fff' }}>{navigation.getParam('saldo')}</Text>
        </TouchableOpacity>
      ),
      headerLeft: null
    }
  }

  async componentDidMount() {
    const { navigation } = this.props
    const from = navigation.getParam('from')
    this.setState({
      from
    })
    await this.props.fetchMenus()
    await this.props.navigation.setParams({ saldo: this.props.saldo })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
          onPress={() => this.props.navigation.navigate('Payment', { orders: this.props.menus, from: this.state.from })}
          style={{
            backgroundColor: '#f64747',
            marginTop: 10,
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20
          }}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 17 }}>VIEW BASKET</Text>
        </TouchableOpacity>
      )
    } else {
      return (<View />)
    }
  }

  render() {
    let checkItem = (item) => {
      if (item.order) {
        return (<View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity
              onPress={this.addToBasket.bind(this, item.id, 'reduce')}
              style={{ backgroundColor: '#f64747', width: 20, height: 20, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', color: '#fff' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginHorizontal: 10 }}>{item.order}</Text>
            <TouchableOpacity
              onPress={this.addToBasket.bind(this, item.id, 'add')}
              style={{ backgroundColor: '#f64747', width: 20, height: 20, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', color: '#fff' }}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#f64747',
              color: '#fff',
              height: 20,
              marginTop: 5,
              borderRadius: 5,
              padding: 5,
            }}
            onChangeText={text => item.notes = text}
            value={item.notes}
          />
        </View>
        )
      } else {
        return (<TouchableOpacity
          style={{ backgroundColor: '#f64747', padding: 5, borderRadius: 10, marginTop: 20 }}
          onPress={this.addToBasket.bind(this, item.id, 'add')}>
          <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center' }}>
            ADD TO BASKET
          </Text>
        </TouchableOpacity>)
      }
    };
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
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
          {/* <View style={{ marginTop: 70 }}> */}
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);                
              }}>
              <View style={{ marginTop: 80, height: '25%', borderWidth: 2 }}>
                <View>
                  <Text>Hello World!</Text>
                </View>
              </View>
            </Modal>
          {/* </View> */}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Menus)
