import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import BeforeHome from './screens/BeforeHome'


// Native Base
import {StyleProvider} from 'native-base'
import getTheme from './native-base-theme/components';
import themes from './native-base-theme/variables/themes';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <StyleProvider style={getTheme(themes)}>
              <BeforeHome />
          </StyleProvider>
          
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});




