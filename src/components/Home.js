import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native'


class Home extends Component {
    render() {
        return (
            <View>
                <Text>Home Page</Text>
                <Button title='Sign Out' onPress={this.props.signOut} />
            </View>
        );
    }
}

export default Home;