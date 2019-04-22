import React, {Component} from 'react';
import {Alert, FlatList, View} from 'react-native'
import {Body, Button, ListItem, Text} from 'native-base'

import {dbOrders, dbOnGoing} from "../../../helpers/firebase";
import * as menus from "../../../helpers/firebase/menus";
import * as users from "../../../helpers/firebase/users";
import styles from "./styles";

// const query = dbOrders.where("status", "==", 1).orderBy('createdAt');
const query = dbOnGoing.where("chef", "==", "5NAqr6b7BMdvf1sk5Wv9BtkvjXT2").orderBy('createdAt');

class ChefMenuAccepted extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    query
      .onSnapshot(
        async (onGoing) => {
          let menu = {};
          let data = await Promise.all(
            onGoing.docs.map(async (doc) => {
              let onGoing = {key: doc.id, ...doc.data()};
              menu = await menus.findById(onGoing.menuId);
              onGoing['image'] = menu.image;
              onGoing['name'] = menu.name;
              return onGoing;
            })
          );
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
      <ListItem>
        <Body>
          <Text>Table {item.table}: "{item.note}"</Text>
        </Body>
      </ListItem>
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
          keyExtractor={(item, index) => 'menu-list-accepted'+item.key}
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
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => 'menu-list-item-accepted'+item.key}
                />
              </View>
            )
          }}
        />
      </View>
    );
  }
}


export default ChefMenuAccepted;
