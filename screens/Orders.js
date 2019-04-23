import React, {Component} from 'react'
import {Text, View, Dimensions, FlatList, TouchableHighlight} from 'react-native'
import QRCode from 'react-native-qrcode';
import {dbOrders, dbUsers} from "../helpers/firebase";
import styles from "./Chef/ChefMenuList/styles";
import {Button, ListItem} from "native-base";

const {width} = Dimensions.get('window');

const query = dbOrders.orderBy('createdAt', "desc");
import * as users from "../helpers/firebase/users";

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
              let newOrder = {key: item.id, ...item.data()};
              newOrder['user'] = await users.findById(newOrder.userId);
              return newOrder;
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

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          onEndReachedThreshold={0}
          keyExtractor={(item, index) => 'menu-list-todo' + item.key}
          renderItem={({item, index}) => {
            if (+item.status === 3) {
              return (
                <TouchableHighlight
                  style={{
                    padding: 10
                  }}
                  onPress={() => {
                    console.log({text: `{orderId:'${item.key}',userId: '${item.user.id}', table: ${item.user.table}}`}, 'test');
                    this.props.navigation.navigate('OrdersQRCode', {text: `{"orderId":"${item.key}", "userId": "${item.user.id}", "table": "${item.user.table}"}`});
                  }}
                >
                  <Text>{item.createdAt} {item.key} {item.status}</Text>
                </TouchableHighlight>
              )
            } else {
              return (
                <View
                  style={{
                    padding: 10
                  }}
                >
                  <Text>{item.createdAt} {item.key} {item.status}</Text>
                </View>
              )
            }

          }}
        />
      </View>
    )
  }
}
