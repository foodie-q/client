import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  Alert,
  Dimensions,
  LayoutAnimation,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import {scanQR} from '../store/actions/api'
import localStorage from '../helpers/localStorage'
import Loading from "../components/Loading";

class ScanQR extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    loading: false,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.validQR !== this.props.validQR || this.state.lastScannedUrl !== prevState.lastScannedUrl) {
      if (this.props.validQR) {
        Vibration.vibrate(500);
        this.setState({
          loading: false
        });
        this.props.validQR = false;
        this.props.navigation.replace('Menus');
      }
    }
  }

  _requestCameraPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = async result => {
    if (result.data !== this.state.lastScannedUrl && !this.state.loading) {
      LayoutAnimation.spring();
      if (+result.data) {
        this.setState({
          loading: true
        });
        setInterval(()=>{
          this.setState({
            loading: false
          });
        }, 30000);
        this.props.scanQR({
          userId: await localStorage.getItem('userId'),
          table: +result.data
        });
      }
      this.setState({lastScannedUrl: result.data});
    }
  };

  render() {
    if (this.state.loading) return <Loading/>;

    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{color: '#fff'}}>
              Camera permission is not granted
            </Text>
            : <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />}

        {this._maybeRenderUrl()}

        <StatusBar hidden/>
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        {
          text: 'No', onPress: () => {
          }
        },
      ],
      {cancellable: false}
    );
  };

  _handlePressCancel = () => {
    this.setState({lastScannedUrl: null});
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  validQR: state.api.validQR
})

const mapDispatchToProps = dispatch => ({
  scanQR: (object) => dispatch(scanQR(object))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScanQR)
