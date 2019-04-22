import React, {Component} from 'react';
import {View, FlatList, Alert} from 'react-native'
import {Text, ListItem, Body, Button} from 'native-base'

import styles from './styles'
import {dbOrders} from "../../helpers/firebase";

import * as menus from "../../helpers/firebase/menus";
import * as users from "../../helpers/firebase/users";

const query = dbOrders.where("status", "==", 0).orderBy('createdAt');

class ChefMenuList extends Component {
  state = {
    data: [],
    recomendation: []
  };

  componentDidMount() {
    query
      .onSnapshot(
        async (orders) => {
          let menu = {};
          await Promise.all(
            orders.docs.map(async (doc) => {
              let order = {key: doc.id, ...doc.data()};
              order['menu'] = await menus.findById(order.menuId.id);
              order['user'] = await users.findById(order.userId.id);

              let pointer = menu[order.menu.id];
              if (pointer && pointer.order.length < order.menu.max) {
                menu[order.menu.id].order.push({
                  id: doc.id,
                  note: order.note,
                  table: order.user.table
                });
                menu[order.menu.id].time += (+order.menu.time * 0.1);
              } else {
                menu[order.menu.id] = {
                  menuId: order.menu.id,
                  image: order.menu.image,
                  name: order.menu.name,
                  order: [{
                    id: doc.id,
                    note: order.note,
                    table: order.user.table
                  }],
                  time: order.menu.time
                }
              }

              delete order['menuId'];
              delete order['userId'];

              return order;
            })
          );
          let data = [];
          for (let key in menu) {
            if (menu.hasOwnProperty(key)) {
              data.push(menu[key]);
            }
          }

          data.sort((a, b) => {
            return a.time - b.time;
          });

          this.setState({
            data
          });

        },
        (err) => {
          console.log(err)
        });
  }

  renderItem = ({item, index}) => {
    return (
      <ListItem>
        <Body>
          <Text>Table {item.table}: "{item.note}"</Text>
        </Body>
      </ListItem>
    );
  };

  setAccepted = (item) => {
    console.log(item);
    Alert.alert(
      item.name,
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            console.log(item);
          }
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {data} = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          onEndReachedThreshold={0}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => 'menu-list-todo' + item.key}
          renderItem={({item, index}) => {
            console.log(item)
            return (
              <View>
                <ListItem
                  style={{flex: 1, justifyContent: 'space-between'}}
                  itemDivider
                >
                  <Text>{item.name} : Estimasi {(item.time / 60).toFixed(0)} Minutes</Text>
                  <Button
                    onPress={() => {
                      this.setAccepted(item)
                    }}
                  >
                    <Text>
                      Accept
                    </Text>
                  </Button>
                </ListItem>
                <FlatList
                  data={item.order}
                  onEndReachedThreshold={0}
                  contentContainerStyle={styles.listItemContainer}
                  keyExtractor={(item, index) => 'menu-list-item-todo' + item.key}
                  renderItem={this.renderItem}
                />
              </View>
            )
          }}
        />
      </View>
    );
  }
}


export default ChefMenuList;
