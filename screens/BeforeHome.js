import React, {Component} from 'react'
import {connect} from 'react-redux'

import RootNavigation from '../navigations/RootNavigation'
import AuthNavigation from '../navigations/AuthNavigation'
import ChefNavigator from '../navigations/ChefNavigator'
import WaitersNavigator from "../navigations/WaitersNavigation";

import localStorage from '../helpers/localStorage';

class BeforeHome extends Component {
  state = {
    user: this.props.user
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.user.role !== nextProps.user.role) {
      this.setState({
        user: nextProps.user
      })
    }
  }

  componentDidMount() {
    localStorage
      .getItem('userId')
      .then(async (data) => {
        let role = await localStorage.getItem('role');
        this.setState({
          user: {
            userId: data || '',
            role: role || ''
          }
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  render() {
    if (!this.state.user) return <AuthNavigation/>;
    switch (this.state.user.role + '') {
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
  user: state.Auth.user,
});


export default connect(mapStateToProps)(BeforeHome)
