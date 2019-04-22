import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Button, FlatList, Modal, Alert } from 'react-native'
import { fetchFoods, orderFood } from '../store/actions/api'

class Menus extends Component {
  state = {
    orders: [],
    modalVisible: false
  }

  componentDidMount() {
    this.props.fetchFoods()
  }

  changeToCurrency(input) {
    return 'Rp ' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  addToBasket(id, options) {
    this.props.orderFood(this.props.foods, id, options)
  }

  checkOrder() {
    let haveOrder = false
    this.props.foods.forEach(food => {
      if (food.order) {
        haveOrder = true
      }
    })

    if (haveOrder) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Payment', { orders: this.props.foods })}
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
            onPress={this.addToBasket.bind(this, item.recipe_id, 'reduce')}
            style={{ backgroundColor: 'orange', width: 20, height: 20, borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>-</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', marginHorizontal: 10 }}>{item.order}</Text>
          <TouchableOpacity
            onPress={this.addToBasket.bind(this, item.recipe_id, 'add')}
            style={{ backgroundColor: 'orange', width: 20, height: 20, borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>+</Text>
          </TouchableOpacity>
        </View>)
      } else {
        return (<TouchableOpacity
          style={{ backgroundColor: 'orange', padding: 5, borderRadius: 10, marginTop: 20 }}
          onPress={this.addToBasket.bind(this, item.recipe_id, 'add')}>
          <Text style={{ fontSize: 10, color: '#fff' }}>
            ADD TO BASKET
          </Text>
        </TouchableOpacity>)
      }
    }
    return (
      this.props.isLoading ? <ActivityIndicator size='large' color='#f64747' /> :
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList data={this.props.foods} renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 15,
                  paddingHorizontal: 10
                }}
                key={item.recipe_id}>
                <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                <View style={{ flex: 1.5, paddingLeft: 10 }}>
                  <Text>{item.title}</Text>
                  <Text style={{ fontSize: 10, color: 'grey' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis.</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center' }}>{this.changeToCurrency(item.title.length * 1000)}</Text>
                  {checkItem(item)}
                </View>
              </TouchableOpacity>
            )}
              keyExtractor={(item) => item.recipe_id}
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
  foods: state.api.foods,
  isLoading: state.api.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchFoods: () => dispatch(fetchFoods()),
  orderFood: (list, id, options) => dispatch(orderFood(list, id, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menus)