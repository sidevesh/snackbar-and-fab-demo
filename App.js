import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import FAB from 'react-native-fab';
import Snackbar from 'react-native-snackbar-component';

export default class SnackFab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fabIsVisible: false,
      snackIsVisible: false,
      distance: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={()=>{this.setState({snackIsVisible: !this.state.snackIsVisible});}}
          title="SNACKToggle"
          color="#841584"
          accessibilityLabel="toggle"
        />
        <Button
          onPress={()=>{this.setState({fabIsVisible: !this.state.fabIsVisible});}}
          title="FABToggle"
          color="#841584"
          accessibilityLabel="toggle"
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <FAB
          visible={this.state.fabIsVisible}
          onClickAction={()=>{alert("fab time!");}}
          snackOffset={this.state.distance}
        />
        <Snackbar
          visible={this.state.snackIsVisible}
          textMessage="Hello There!"
          actionHandler={()=>{console.log("snack time!")}}
          actionText="let's go"
          distanceCallback={(distance)=>{this.setState({distance: distance});}}
        />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
