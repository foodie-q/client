import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RootNavigation from '../navigations/RootNavigation'
import AuthNavigation from '../navigations/AuthNavigation'

class BeforeHome extends Component {
  
  render() {
    return (
          this.props.logged ? 
            <RootNavigation /> : <AuthNavigation />
    )
  }
}

const mapStateToProps = (state) => ({
  logged: state.Auth.user != null
})



export default connect(mapStateToProps)(BeforeHome)
