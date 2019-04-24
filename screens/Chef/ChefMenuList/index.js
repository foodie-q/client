import React, {Component} from 'react';
import {Alert, FlatList, View} from 'react-native'
import {Body, Button, ListItem, Text} from 'native-base'

import styles from './styles'
import {dbOrders} from "../../../helpers/firebase";

import * as menus from "../../../helpers/firebase/menus";
import * as users from "../../../helpers/firebase/users";

const query = dbOrders.where("status", "==", 0).limit(5).orderBy('createdAt');

class ChefMenuList extends Component {
  state = {
    data: [],
    recomendation: []
  };

  componentDidMount() {
    query
      .onSnapshot(
        async () => {
          query
            .get()
            .then(async (orders) => {
              let dataMenu = {};
              await Promise.all(
                orders.docs.map(async (doc) => {
                  let order = {key: doc.id, ...doc.data()};
                  order['user'] = await users.findById(order.userId);
                  delete order['userId'];

                  let time = 0;
                  order.menus = await Promise.all(await order.menus.map(async (item, i) => {
                    if (item.status + '' !== '0') {
                      return ''
                    }
                    const menu = await menus.findById(item.id);
                    const estimate = item.status !== 2 ? menu.time + ((menu.time * 0.1) * item.quantity) : 0;
                    time += estimate;

                    let data = {menuId: item.id, ...item};
                    data['image'] = menu.image;
                    data['time'] = estimate;

                    let pointer = dataMenu[menu.id];
                    if (pointer) {
                      dataMenu[menu.id].time += menu.time;
                      dataMenu[menu.id].order.push({
                        orderId: order.key,
                        table: order.user.table, quantity: item.quantity, ...menu,
                        notes: data.notes
                      })
                    } else {
                      dataMenu[menu.id] = {
                        key: menu.id,
                        image: menu.image,
                        name: menu.name,
                        time: menu.time,
                        order: [{
                          orderId: order.key,
                          table: order.user.table, quantity: item.quantity, ...menu,
                          notes: data.notes
                        }]
                      }
                    }
                    return data;
                  }));

                  order['time'] = time;

                  return order;
                })
              );

              let data = [];

              for (let key in dataMenu) {
                if (dataMenu.hasOwnProperty(key)) {
                  data.push(dataMenu[key])
                }
              }

              data.sort((a, b) => {
                return a.time - b.time;
              });

              this.setState({
                data
              });
            })
            .catch((e) => {
              console.log(e.message)
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
          <Text>{item.quantity}x {item.name}: "{item.notes}"</Text>
        </Body>
      </ListItem>
    );
  };

  setAccepted = (payload) => {
    Alert.alert(
      payload.name,
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            payload.order.forEach(async (item) => {
              try {
                let order = await dbOrders.doc(item.orderId).get();
                let data = await order.data();
                let isDone = true;
                data.menus = data.menus.map((menu) => {
                  if (item.id + '' === menu.id) {
                    isDone = isDone && true;
                    console.log(isDone, 'fi');
                    return {...menu, status: 1}
                  } else {
                    isDone = isDone && menu.status + '' !== '0';
                    console.log(isDone, 'else');
                    return menu
                  }
                });
                if (isDone) {
                  data.status = 1;
                }
                await dbOrders.doc(item.orderId).set(data);
              } catch (e) {
                console.log(e.message)
              }
            })
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
                      Done
                    </Text>
                  </Button>
                </ListItem>
                <FlatList
                  data={item.order}
                  onEndReachedThreshold={0}
                  contentContainerStyle={styles.listItemContainer}
                  keyExtractor={(item, index) => 'menu-list-item-todo' + item.id + index}
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
