import React, {Component} from 'react'
import {ActivityIndicator, Dimensions, FlatList, Text, View} from 'react-native'
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux'
import {createBalance} from "../store/actions/api";
import localStorage from '../helpers/localStorage'
import FloatingLabelInput from "../components/FloatingLabelInput";
import {dbSaldo, dbUsers} from "../helpers/firebase";
import moment from 'moment';
import numberToRupiah from '../helpers/convert/numberToRupiah'

const {height} = Dimensions.get('window');

class TopUpSaldo extends Component {
  state = {
    nominal: '',
    data: [],
    loading: false,
  };

  componentDidMount() {
    (async () => {
      dbSaldo.where('userId', '==', dbUsers.doc(await localStorage.getItem('userId'))).orderBy('createdAt', 'desc')
        .onSnapshot(
          async (saldo) => {
            let data = await Promise.all(
              saldo.docs.map(async (doc) => {
                try {
                  let pointerSaldo = {key: doc.id, ...doc.data()};
                  delete pointerSaldo['userId'];
                  return pointerSaldo;
                } catch (e) {
                  console.log(e.message);
                  return ''
                }
              })
            );
            this.setState({
              data
            })
          },
          (err) => {
            console.log(err.message)
          })
    })()
  }

  handleChange = (key) => (val) => {
    if (key === 'nominal') {
      val = val.replace('.', '');
      val = val.replace(/[^0-9]/g, '');
      val = numberToRupiah(val, false);
      this.setState({
        [key]: val
      })
    }
  };

  async submitTopUp() {
    this.setState({
      loading: true,
    });
    await this.props.createBalance({
      userId: await localStorage.getItem('userId'),
      createdAt: new Date(),
      money: (''+this.state.nominal).replace(/[^0-9]/g, ''),
      status: 1,
    });

    if (!this.props.loadingBalance) {
      this.setState({
        nominal: '',
        loading: false,
      });
      // this.props.navigation.navigate('Profile')
    }
  }

  render() {
    const {data, loading} = this.state;
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
        }}
      >
        <FloatingLabelInput
          label="Input Your TOP UP Nominal"
          value={this.state.nominal}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          onChangeText={this.handleChange('nominal')}
          returnKeyType="next"
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
            maxHeight: Math.floor(height * 0.1)
          }}
        >
          {
            loading
            && <ActivityIndicator size='large' color='#f64747' style={{width: '100%'}}/>
          }
          {
            !loading
            && <Button
              sytyle={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
              onPress={() => this.submitTopUp()}
            >
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: 10,
                  color: 'white'
                }}
              >SUBMIT</Text>
            </Button>
          }

        </View>
        <FlatList
          data={data}
          sytle={{
            flex: 1,
            marginTop: 10,
            backgroundColor: 'black'
          }}
          renderItem={({item, index}) => {
            if (!item) return <></>;
            let color, icon;
            if (+item.status === 0) {
              icon = 'trending-down';
              color = 'red';
            } else {
              icon = 'trending-up';
              color = 'green';
            }
            return (
              <View style={{
                paddingTop: 20,
                paddingBottom: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottomWidth: .5,
                borderBottomColor: 'grey',

              }}>
                <View
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Icon ios={`ios-${icon}`} android={`md-${icon}`} name={'status'}/>
                </View>
                <View
                  style={{
                    flex: 7
                  }}
                >
                  <Text style={{fontWeight: 'bold', width: '100%', marginBottom: 10}}># {item.key}</Text>
                  <Text style={{color: 'grey'}}>{moment(item.createdAt).fromNow()} </Text>
                </View>
                <View
                  style={{
                    flex: 4,
                  }}
                >
                  <Text style={{
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'right',
                  }}>{+item.status === 0 ? '-' : '+'} {numberToRupiah(item.money)}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  balanceHistory: state.api.balanceHistory,
  loadingBalanceHistory: state.api.loadingBalanceHistory,
  loadingBalance: state.api.loadingBalance,
})

const mapDispatchToProps = dispatch => ({
  createBalance: (objCreate) => dispatch(createBalance(objCreate))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopUpSaldo)
