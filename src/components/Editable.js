import React from 'react';
import EditableForm from './EditableForm';
import EditableFormButton from './EditableFormButton';

export default class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
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
        <EditableForm submitCallback={this.saveEditedCallback.bind(this)} cancelCallback={this.toggleEditingState.bind(this)} />
      );
    } else {
      return (
        <EditableFormButton openEditingForm={this.toggleEditingState.bind(this)} />
      );
    }
  }
}
