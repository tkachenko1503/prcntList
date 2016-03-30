import React from 'react';
import EditableForm from './EditableForm';
import EditableFormButton from './EditableFormButton';

export default class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
    this.saveEditedCallback = this.saveEditedCallback.bind(this);
    this.toggleEditingState = this.toggleEditingState.bind(this);
  }

  toggleEditingState(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing});
  }

  saveEditedCallback(e) {
    e.preventDefault();
    let newValue = e.target.elements["editedValue"].value;

    if (newValue) {
      this.editAction(Number(newValue));
    }

    this.setState({editing: false});
  }

  cancelEditing(e) {
    e.preventDefault();
    this.setState({editing: false});
  }

  editableMarkup(canEdit) {
    if (!canEdit) {
      return;
    }

    if (this.state.editing) {
      return (
        <EditableForm submitCallback={this.saveEditedCallback} cancelCallback={this.toggleEditingState} />
      );
    } else {
      return (
        <EditableFormButton openEditingForm={this.toggleEditingState} />
      );
    }
  }
}
