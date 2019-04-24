import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { FlatList, Image, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native'
import { fetchMenus, orderFood, changeNotes } from '../store/actions/api'

class Menus extends Component {
  state = {
    orders: [],
    modalVisible: false,
    saldo: 0,
    from: '',
    menuNotes: '',
    menuId: '',
    arrival: ''
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
    const arrival = navigation.getParam('arrival')
    if (arrival) {
      this.setState({
        from,
        arrival
      })
    } else {
      this.setState({
        from
      })
    }
    await this.props.fetchMenus()
    await this.props.navigation.setParams({ saldo: this.props.saldo })
  }

  setModalVisible(visible, menuId, menuNotes) {
    if (menuId) {
      this.setState({ modalVisible: visible, menuId, menuNotes });
    } else {
      this.setState({ modalVisible: visible });
    }
  }

  changeToCurrency(input) {
    return 'Rp' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  addToBasket(id, options) {
    this.props.orderFood(this.props.menus, id, options)
  }

  async submitNotes() {
    this.props.changeNotes(this.props.menus, this.state.menuId, this.state.menuNotes)
    await this.setState({
      modalVisible: false
    })
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
          onPress={() => this.props.navigation.navigate('Payment', { orders: this.props.menus, from: this.state.from, arrival: this.state.arrival })}
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
          <TouchableOpacity
            style={{ backgroundColor: '#f64747', padding: 5, borderRadius: 10, marginTop: 20 }}
            onPress={() => this.setModalVisible(true, item.id, item.notes)}>
            <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center' }}>
              ADD NOTES
          </Text>
          </TouchableOpacity>
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
      this.props.isLoading ? <Loading /> :
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={{ marginTop: 80, height: '25%', padding: 30 }}>
              <Text>Add notes to your dish</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{ borderWidth: 0.2, borderColor: 'grey' }}
                placeholder="Example: Make my food spicy!"
                onChangeText={(text) => { this.setState({ menuNotes: text }) }}
                value={this.state.menuNotes}
              />
              <TouchableOpacity
                style={{ backgroundColor: '#f64747', padding: 10, marginTop: 10, borderRadius: 20, width: '25%' }}
                onPress={() => this.submitNotes()}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>DONE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
  changeNotes: (list, menuId, menuNotes) => dispatch(changeNotes(list, menuId, menuNotes)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menus)
