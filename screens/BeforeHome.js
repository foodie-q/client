import React, {Component} from 'react'
import {connect} from 'react-redux'

import RootNavigation from '../navigations/RootNavigation'

import localStorage from '../helpers/localStorage';

class BeforeHome extends Component {
  state = {
    user: this.props.user
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (!!('' + nextProps.user.role).length) {
      this.setState({
        user: {
          role: ''
        }
      })
    } else if (this.state.user.role !== nextProps.user.role) {
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
    return <RootNavigation/>;
  }
}

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});


export default connect(mapStateToProps)(BeforeHome)
