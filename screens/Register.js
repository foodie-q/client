import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {register} from '../store/Auth/actions'
import RegisterForm from '../components/RegisterForm'
import {Icon} from "native-base";
import localStorage from "../helpers/localStorage";

class Register extends Component {
  static navigationOptions = {
    tabBarLabel: 'Register',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name={'person'}
        ios='ios-person-add'
        android="md-person-add"
        style={{color: `${tintColor}`}}/>
    )
  };

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {replace} = this.props.navigation;
    if (prevState.user.role !== this.state.user.role && prevProps.user.role !== this.props.user.role) {
      switch (this.state.user.role + '') {
        case "0":
          replace('Customer');
          break;
        case "1":
          replace('Chef');
          break;
        case "2":
          replace('Waiters');
          break;
        default:
          if (prevProps.user.role !== this.props.user.role) {
            replace('AuthLogin');
          }
          break;
      }
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
    return (
      <RegisterForm
        register={this.props.register}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => {
  return ({
    loading: state.Auth.loading,
    user: state.Auth.user,
  })
};

const mapDispatchtoProps = (dispatch) => bindActionCreators({
  register
}, dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(Register)
