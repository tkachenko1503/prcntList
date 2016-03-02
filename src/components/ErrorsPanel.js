import React from 'react';

export default class ErrorsPanel extends React.Component {
  renderError(error) {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      );
    }
  }

  render() {
    let errors = this.props.errors.map(error => this.renderError(error));

    return (
      <div>
        {errors}
      </div>
    );
  }
};
