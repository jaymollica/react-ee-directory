import React from 'react'

class UpdateEmployeeForm extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      department: '',
      email: '',
      id: '',
      submitValue: 'Submit',
    };

    this.props.service.findById(this.props.id).then( function(result) {
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        title: result.title,
        department: result.department,
        email: result.email,
        id: result.id,
      });
    }.bind(this));

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.service.updateEmployee(this.state);
    this.setState(
      {
        submitValue: 'Updated!',
      }
    );
  }

  handleEmailChange(event) {
    this.setState(
      {
        email: event.target.value,
      }
    );
  }

  handleFirstNameChange(event) {
    this.setState(
      {
        firstName: event.target.value,
      }
    );
  }

  handleLastNameChange(event) {
    this.setState(
      {
        lastName: event.target.value,
      }
    );
  }

  handleTitleChange(event) {
    this.setState(
      {
        title: event.target.value,
      }
    );
  }

  handleDepartmentChange(event) {
    this.setState(
      {
        department: event.target.value,
      }
    );
  }

  render() {
    console.log(this);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={"form-group"}>
          <label>First Name</label>
          <input type="text" name="firstName" className={"form-control"} value={this.state.firstName} onChange={this.handleFirstNameChange} />
        </div>

        <div className={"form-group"}>
          <label>Last Name</label>
          <input type="text" name="lastName" className={"form-control"} value={this.state.lastName} onChange={this.handleLastNameChange} />
        </div>

        <div className={"form-group"}>
          <label>Title</label>
          <input type="text" name="title" className={"form-control"} value={this.state.title} onChange={this.handleTitleChange}/>
        </div>

        <div className={"form-group"}>
          <label>Email</label>
          <input type="email" name="email" className={"form-control"} value={this.state.email} onChange={this.handleEmailChange} />
        </div>

        <div className={"form-group"}>
          <label>Department</label>
          <input type="text" name="department" className={"form-control"} value={this.state.department} onChange={this.handleDepartmentChange}/>
        </div>
        <button type="submit" className={"btn btn-primary"}>{this.state.submitValue}</button> <a className={"btn btn-link"} href="/">Home</a>
      </form>
    );
  }
}

export default UpdateEmployeeForm