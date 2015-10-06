'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextView,
  TouchableHighlight,
  View,
  ScrollView,
  TouchableOpacity
} = React;

var ListView = React.createClass({
  render: function () {
    return (
      <ScrollView style={{flex: 1}}
        onScroll={() => { console.log('onScroll!'); }}>
        {this.renderTodos()}
      </ScrollView>
    );
  },

  renderTodos: function () {
    return this.props.todos.map((todo, idx) =>
      <View style={styles.listItem}>
        <View style={styles.todo}>
          <Text style={styles.todoText}>{todo}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.onRemove(idx)}>
          <View style={styles.doneButton}></View>
        </TouchableOpacity>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 10,
    padding: 20,
    backgroundColor: '#00ff00'
  },
  todo: {
    flex: 5,
    alignSelf: 'flex-start',
  },
  todoText: {
    fontSize: 20,
    color: 'navy'
  },
  doneButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30
  }
});

module.exports = ListView;
