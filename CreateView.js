'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;

var CreateView = React.createClass({
  getInitialState: function () {
      return {todo: ''}
  },

  render: function () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Please input a new todo item...
        </Text>
        <TextInput
          placeholder="Do awesome stuff"
          value={this.state.todo}
          onChangeText={this.updateTodo}>
        </TextInput>
        <TouchableOpacity onPress={this.submitTodo}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Save todo!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },

  updateTodo: function (text) {
    this.setState({todo: text});
  },

  submitTodo: function () {
    if(this.state.todo) {
      this.props.onCreate(this.state.todo);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20
  },
  header: {
    fontSize: 20
  },
  button: {
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    padding: 40,
  },
  buttonText: {
    fontSize: 30,
    color: '#ffffff'
  }
});

module.exports = CreateView;
