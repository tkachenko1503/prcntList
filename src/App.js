import React from 'react';
import flyd from 'flyd';
import listActions from './streams/list';
import Header from './components/Header';
import List from './components/List';

export default class App extends React.Component {
  componentWillMount() {
    this._endStream = flyd.on(newState => {
      this.setState(newState);
    }, this.props.stateStream);
  }

  componentWillUnmount() {
    this._endStream(true);
  }

  render() {
    // let saved = Object.keys(appActions.getAllLists());
    return(
      <div className="container">
        <Header saved={this.state.allLists} showListById={listActions.renderFromList} showNewList={listActions.renderNewList} />
        <List
          categories={this.state.categories}
          items={this.state.items}
          listId={this.state.currentList}
          errors={this.state.errors}
        />
      </div>
    );
  }
}
