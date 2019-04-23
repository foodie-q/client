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
        async () => {
          query
            .get()
            .then(async (orders) => {

              let data = await Promise.all(
                orders.docs.map(async (doc) => {
                  try {
                    let order = {key: doc.id, ...doc.data()};
                    order['user'] = await users.findById(order.userId);
                    delete order['userId'];

                    order.menus = await Promise.all(await order.menus.map(async (item, i) => {
                      const menu = await menus.findById(item.id);

                      let data = {menuId: item.id, ...item};
                      data['image'] = menu.image;

                      return data;
                    }));

                    return order;
                  } catch (e) {
                    return ''
                  }
                })
              );
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
          item.status + '' !== '0'
            ? <Text style={{backgroundColor: 'white', opacity: 0.8, height: '100%', width: '100%'}}> </Text>
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
          keyExtractor={(item, index) => 'menu-list-done' + item.key}
          renderItem={({item, index}) => {
            if (!item) return <></>;
            return (
              <View>
                <ListItem
                  style={{flex: 1, justifyContent: 'space-between'}}
                  itemDivider
                >
                  <Text>Table {item.user.table}</Text>
                </ListItem>
                <FlatList
                  data={item.menus}
                  onEndReachedThreshold={0}
                  contentContainerStyle={styles.listItemContainer}
                  numColumns={5}
                  keyExtractor={(item, index) => 'menu-list-item-done' + item.key}
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
