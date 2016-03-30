import React from 'react';
import flyd from 'flyd';
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
    return(
      <div className="container">
        <Header
          saved={this.state.allLists} />
        <List
          categories={this.state.categories}
          items={this.state.items}
          list={this.state.list} />
      </div>
    );
  }
}
