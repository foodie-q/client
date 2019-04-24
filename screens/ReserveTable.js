import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import TimePicker from 'react-native-simple-time-picker'

export default class ReserveTable extends Component {
  state = {
    selectedHours: new Date().getHours() + 2,
    selectedMinutes: new Date().getMinutes()
  }

  getAMorPM() {
    if (this.state.selectedHours > 12 && this.state.selectedHours !== 24) {
      return (<Text>
        PM
      </Text>)
    } else {
      return (<Text>
        AM
      </Text>)
    }
  }

  submitArrival() {
    if (this.state.selectedHours < (new Date().getHours() + 2)) {
      Alert.alert('Arrival Time should be 2 hours from now.')
    }
    else if (this.state.selectedHours > 20) {
      Alert.alert('Sorry, Reserve Table is only available until 8 P.M.')
    }
    else if (this.state.selectedHours === 20 && this.state.selectedMinutes > 0) {
      Alert.alert('Sorry, Reserve Table is only available until 8 P.M.')
    }
    else {
      this.props.navigation.navigate('Menus', { from: 'reserve', arrival: { hours: this.state.selectedHours, minutes: this.state.selectedMinutes } })
    }
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Please Pick Your Arrival Time</Text>
        <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) => this.setState({
            selectedHours: hours,
            selectedMinutes: minutes
          })}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#f64747', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginTop: 10 }}
          onPress={() => this.submitArrival()}
        >
          <Text style={{ fontSize: 18, color: '#fff' }}>CONFIRM</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
