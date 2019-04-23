import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    textInput: {
        backgroundColor: '#ffffff',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#f64747',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

class AuthForm extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (key) => (val) => {
        this.setState({
            [key]: val
        })
    }

    handleButtonPress = () => {
        this.props.onButtonPress(this.state.email, this.state.password)
    }

    render() {
        return (
            <View
                style={styles.container}>

                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={this.handleChange('email')}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    returnKeyType="done"
                    onChangeText={this.handleChange('password')}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleButtonPress}>

                    <Text style={styles.buttonTitle}>{this.props.buttonTitle}</Text>

                </TouchableOpacity>

            </View>
        )
    }
}

export default AuthForm
