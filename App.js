import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from './src/components/Login'
import Home from './src/components/Home'
import axios from 'axios'
import { NativeRouter as Router, Switch, Route, Redirect } from 'react-router-native'

const ACCESS_TOKEN = 'access-token'


export default class App extends Component {

  state = {
    signedIn: false,
  }

  componentDidMount() {
    this.checkSignIn()
  }

  signIn = async (email, password) => {

    const payload = {
      email: email,
      password: password,
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/sign_in', payload)
      // console.log(res.headers['access-token'])

      AsyncStorage.setItem(ACCESS_TOKEN, res.headers['access-token'])

      this.setState({ signedIn: true })


    } catch (error) {
      console.log(error)
    }
  }


  checkSignIn = async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
      console.log(token)
      token
        ? this.setState({ signedIn: true })
        : this.setState({ signedIn: false })
    } catch (error) {
      console.log(error)
    }
  }

  signOut = async () => {
    try {
      await AsyncStorage.clear()
      this.setState({ signedIn: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const LoginWrapper = (props) => {
      return <Login {...props} signIn={this.signIn} />
    }

    const HomeWrapper = (props) => {
      return <Home {...props} signOut={this.signOut} />
    }


    return (
      <View style={styles.container}>
        <Router>
          <View>
            <Switch>
              <Route exact path='/login' render={LoginWrapper} />
              <Route exact path='/home' render={HomeWrapper} />
            </Switch>
            {this.state.signedIn ? <Redirect to='home' /> : <Redirect to='login' />}
          </View>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
