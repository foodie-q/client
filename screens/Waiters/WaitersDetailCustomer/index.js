import React, {Component} from 'react';
import {Text, View} from "react-native";
import {dbUsers} from "../../../helpers/firebase";

class WaitersDetailCustomer extends Component {
  state = {
    users: {name: ''}
  };

  componentDidMount() {
    let user = this.props.navigation.getParam('users');
    dbUsers
      .doc(user)
      .get()
      .then((users) => {
        this.setState({
          users: {
            id: users.id,
            ...users.data()
          }
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  render() {
    const {users: {name, table}} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Please, guide Mr/Mrs.</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10, marginBottom: 20}}>{name}</Text>
        <Text>to table's Number </Text>
        <Text style={{fontWeight: 'bold', fontSize: 70}}>{table}</Text>
      </View>
    );
  }
}

WaitersDetailCustomer.propTypes = {};

export default WaitersDetailCustomer;
