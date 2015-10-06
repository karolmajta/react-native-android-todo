/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
} = React;


var toolbarActions = [
    {screen: 'browse', title: "Browse"},
    {screen: 'create', title: "Create"}
];

var TodoApp = React.createClass({
  getInitialState: function () {
      return {screen: 'browse'}
  },

  render: function () {
    return (
      <View style={styles.screen}>
        <ToolbarAndroid
            actions={toolbarActions}
            onActionSelected={this.onActionSelected}
            style={styles.toolbar}
            title="My Todos"
            subtitle={this.state.screen} />
        <View style={styles.content}>
          <Text>
            Hello, you are on screen: {this.state.screen}
          </Text>
        </View>
      </View>
    );
  },

  onActionSelected: function (idx) {
    this.setState({screen: toolbarActions[idx].screen})
  }
});

var styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    flexDirection: 'column',
    height: 70,
    backgroundColor: '#cecece',
  },
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
