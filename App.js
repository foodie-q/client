import React, {Component} from 'react';

// Native Base
import {StyleProvider} from 'native-base'
import getTheme from './native-base-theme/components';
import themes from './native-base-theme/variables/themes';

// Navigation
import RootNavigation from "./src/navigations/RootNavigation";

export default class extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(themes)}>
        <RootNavigation/>
      </StyleProvider>
    );
  }
}
