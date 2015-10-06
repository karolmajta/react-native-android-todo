'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
  Navigator
} = React;

var CreateView = require('./CreateView');
var ListView = require('./ListView');


var toolbarActions = [
    {screen: 'browse', title: "Browse"},
    {screen: 'create', title: "Create"}
];

var TodoApp = React.createClass({
  getInitialState: function () {
      return {
        currentToolbarAction: toolbarActions[0],
        todos: [
          'Learn react native',
          'Feed ducks',
          'Become a lisper',
          'Learn react native',
          'Feed ducks',
          'Become a lisper'
        ]
      }
  },

  render: function () {
    var subView;

    return (
      <View style={styles.screen}>
        <ToolbarAndroid
            actions={toolbarActions}
            onActionSelected={this.onActionSelected}
            style={styles.toolbar}
            title="My Todos"
            subtitle={this.state.currentToolbarAction.screen} />
        {this.renderScreen()}
      </View>
    );
  },

  renderScreen: function () {
    if (this.state.currentToolbarAction.screen == 'browse') {
      return <ListView todos={this.state.todos} onRemove={this.removeTodo} />
    } else {
      return <CreateView onCreate={this.addTodo} />
    }
  },

  addTodo: function (text) {
    this.setState({
      todos: [text].concat(this.state.todos),
      currentToolbarAction: toolbarActions[0]
    });
  },


  removeTodo: function (idx) {
    console.log('remove todo called...');
    var left = this.state.todos.slice(0, idx);
    var right = this.state.todos.slice(idx+1, this.state.todos.length);
    this.setState({
      todos: left.concat(right)
    })
  },

  onActionSelected: function (idx) {
    this.setState({currentToolbarAction: toolbarActions[idx]})
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
