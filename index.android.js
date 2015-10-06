'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
  BackAndroid,
  AsyncStorage
} = React;

var CreateView = require('./CreateView');
var ListView = require('./ListView');


var toolbarActions = [
    {screen: 'browse', title: "Browse"},
    {screen: 'create', title: "Create"}
];

var TodoApp = React.createClass({
  componentDidMount: function () {
    // handle back button
    BackAndroid.addEventListener('hardwareBackPress', (function () {
      if (this.state.currentToolbarAction.screen == 'create') {
        this.setState({currentToolbarAction: toolbarActions[0]});
        return true;
      }
      return false;
    }).bind(this));
    // fetch initial data from local storage
    AsyncStorage.getItem('todos').then((function (res, err) {
      this.setState({todos: res ? JSON.parse(res) : []});
    }).bind(this));
  },

  getInitialState: function () {
      return {
        currentToolbarAction: toolbarActions[0],
        todos: null
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
    var newTodos = [text].concat(this.state.todos);
    this.persistTodos(newTodos).done((function () {
      this.setState({
        todos: newTodos,
        currentToolbarAction: toolbarActions[0]
      });
    }).bind(this));
  },


  removeTodo: function (idx) {
    var left = this.state.todos.slice(0, idx);
    var right = this.state.todos.slice(idx+1, this.state.todos.length);
    var newTodos = left.concat(right);
    this.persistTodos(newTodos).done((function (err, res) {
      this.setState({
        todos: newTodos
      })
    }).bind(this));
  },

  onActionSelected: function (idx) {
    this.setState({currentToolbarAction: toolbarActions[idx]})
  },

  persistTodos: function (todos) {
    return AsyncStorage.setItem('todos', JSON.stringify(todos));
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
