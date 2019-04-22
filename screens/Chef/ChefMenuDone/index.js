import React, {Component} from 'react';
import {View, FlatList, ImageBackground, Alert} from 'react-native'
import {Body, Button, ListItem, Text} from 'native-base'

import styles from './styles'
import {dbOrders} from "../../../helpers/firebase";

import * as menus from "../../../helpers/firebase/menus";
import * as users from "../../../helpers/firebase/users";

const query = dbOrders.where("status", "<", 3).orderBy('status').orderBy('createdAt');

class ChefMenuDone extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    query
      .onSnapshot(
        async (orders) => {
          var tableList = {};
          await Promise.all(
            orders.docs.map(async (doc) => {
              let order = {key: doc.id, ...(await doc.data())};
              let menu = await menus.findById(order.menuId + '');
              let user = await users.findById(order.userId + '');
              let pointer = tableList[order.userId];
              if (pointer) {
                tableList[order.userId + ''].order.push({
                  key: menu.id,
                  name: menu.name,
                  image: menu.image,
                  note: menu.note,
                  status: order.status
                });
              } else {
                tableList[order.userId + ''] = {
                  key: order.userId,
                  table: user.table,
                  createdAt: order.createdAt.seconds,
                  order: [{
                    key: menu.id,
                    name: menu.name,
                    image: menu.image,
                    note: menu.note,
                    status: order.status
                  }],
                }
              }
              return order;
            })
          );
          let data = [];
          for (let key in tableList) {
            if (tableList.hasOwnProperty(key)) {
              data.push(tableList[key]);
            }
          }
          data.sort((a, b) => {
            return a.createdAt - b.createdAt
          });
          this.setState({
            data
          });

        },
        (err) => {
          console.log(err)
        });
  }

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

  renderItem = ({item, index}) => {
    return (
      <ImageBackground source={{uri: '' + item.image}} style={[styles.listItem]}>
        {
          item.status + '' === '0'
            ? <Text style={{backgroundColor: 'white', opacity: 0.5, height: '100%', width: '100%'}}> </Text>
            : <Text/>
        }
      </ImageBackground>
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
          keyExtractor={(item, index) => 'menu-list-done'+item.key}
          renderItem={({item, index}) => {
            return (
              <View>
                <ListItem
                  style={{flex: 1, justifyContent: 'space-between'}}
                  itemDivider
                >
                  <Text>Table {item.table}</Text>
                  <Button
                    onPress={() => {
                      this.setAccepted(item)
                    }}
                  >
                    <Text>
                      Serve
                    </Text>
                  </Button>
                </ListItem>
                <FlatList
                  data={item.order}
                  onEndReachedThreshold={0}
                  contentContainerStyle={styles.listItemContainer}
                  numColumns={5}
                  keyExtractor={(item, index) => 'menu-list-item-done'+item.key}
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


export default ChefMenuDone;
