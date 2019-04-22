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
        backgroundColor: 'orange',
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

class AuthRegister extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        role: ''

    }

    handleChange = (key) => (val) => {
        this.setState({
            [key]: val
        })
    }

    handleButtonPress = () => {
        this.props.onButtonPress(this.state.email, this.state.password, this.state.name, this.state.role)
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
                    placeholder="Name"
                    returnKeyType="next"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                    onChangeText={this.handleChange('name')}
                    value={this.state.name}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Role"
                    returnKeyType="next"
                    keyboardType="decimal-pad"
                    autoCapitalize="none"
                    onChangeText={this.handleChange('role')}
                    value={this.state.role}
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

export default AuthRegister
