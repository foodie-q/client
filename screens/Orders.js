import React, {Component} from 'react'
import {FlatList, Text, TouchableHighlight, View} from 'react-native'
import {Icon} from 'native-base'
import {dbOrders} from "../helpers/firebase";
import moment from 'moment';

import * as users from "../helpers/firebase/users";

const query = dbOrders.orderBy('createdAt', "desc");

export default class Orders extends Component {
  state = {
    text: "{userId:'919191919', table:'1'}",
    data: []
  };

  componentDidMount() {
    query
      .onSnapshot(
        async (orders) => {
          let data = await Promise.all(
            orders.docs.map(async (item) => {
              try {
                let newOrder = {key: item.id, ...item.data()};
                if (newOrder.userId) {
                  newOrder['user'] = await users.findById(newOrder.userId);
                  return newOrder;
                } else {
                  return ''
                }
              } catch (e) {
                console.log(e);
                return ''
              }
            })
          );
          this.setState({
            data
          })
        },
        (err) => {
          console.error(err)
        }
      )
  }

  renderText = (item) => {
    let color, status, icon = 'timer';
    switch (+item.status) {
      case 0:
        status = 'Wait';
        color = 'black';
        break;
      case 3:
        icon = 'walk';
        status = 'Reserved';
        color = 'black';
        break;
      default:
        icon = 'checkmark-circle-outline';
        status = 'Completed';
        color = 'grey';
        break
    }
    return (
      <View style={{
        paddingBottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderBottomColor: 'grey',

      }}>
        <View
          style={{
            flex: 1,
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Icon ios={`ios-${icon}`} android={`md-${icon}`} style={{color}} name={'status'}/>
        </View>
        <View
          style={{
            flex: 7
          }}
        >
          <Text style={{fontWeight: 'bold', width: '100%', color, marginBottom: 10}}># {item.key}</Text>
          <Text style={{color: 'grey'}}>{moment(item.createdAt).fromNow()} </Text>
        </View>
        <View
          style={{
            flex: 2,
          }}
        >
          <Text style={{fontWeight: 'bold', width: '100%', color, textAlign: 'right',}}>{status}</Text>
        </View>
      </View>
    )
  };

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          onEndReachedThreshold={0}
          keyExtractor={(item) => 'menu-list-todo' + item.key}
          renderItem={({item, index}) => {
            if (!item) return <></>;
            if (+item.status === 3) {
              return (
                <TouchableHighlight
                  style={{
                    width: '100%',
                    padding: 10
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('OrdersQRCode', {text: `{"orderId":"${item.key}", "userId": "${item.user.id}", "table": "${item.user.table}"}`});
                  }}
                >
                  {this.renderText(item)}
                </TouchableHighlight>
              )
            } else {
              return (
                <TouchableHighlight
                  onPress={() => {
                    this.props.navigation.navigate('OrdersPaymentDetail', {orders: item.menus})
                  }}
                  style={{
                    padding: 10
                  }}
                >
                  {this.renderText(item)}
                </TouchableHighlight>
              )
            }

          }}
        />
      </View>
    )
  }
}
