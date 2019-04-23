import React, {Component} from 'react'
import {connect} from 'react-redux'

import RootNavigation from '../navigations/RootNavigation'
import AuthNavigation from '../navigations/AuthNavigation'
import ChefNavigator from '../navigations/ChefNavigator'
import WaitersNavigator from "../navigations/WaitersNavigation";

class BeforeHome extends Component {

  render() {
    switch (this.props.user.role + '') {
      case "0":
        return <RootNavigation/>;
      case "1":
        return <ChefNavigator/>;
      case "2":
        return <WaitersNavigator/>;
      default:
        return <AuthNavigation/>;
    }
  }
}

const mapStateToProps = (state) => ({
  logged: state.Auth.user != null,
  user: state.Auth.user || {role: ""},
});


export default connect(mapStateToProps)(BeforeHome)
