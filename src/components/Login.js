import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native'

const styles = {
    login_title: {
        fontSize: 20,
        marginBottom: 20,
    }
}

class Login extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
    }

    render() {
        return (
            <View>
                <Text style={styles.login_title}>Login Page</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Email'
                    autoCapitalize='none'
                />

                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='Password'
                    autoCapitalize='none'
                />
                <Button 
                    title='Sign In'
                    onPress={() => this.props.signIn(this.state.email, this.state.password)}
                />
            </View>
        );
    }
}

export default Login;