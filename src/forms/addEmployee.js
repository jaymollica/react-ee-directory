import React from 'react'

class AddEmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      department: '',
      email: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.service.addEmployee(this.state);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDepartmentChange(event) {
    this.setState({department: event.target.value});
  }

  render() {
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
          <input type="text" name="department" className={"form-control"} value={this.state.department} onChange={this.handleDepartmentChange} />
        </div>
        <button type="submit" className={"btn btn-primary"}>Submit</button> <a className={"btn btn-link"} href="/">Cancel</a>
      </form>
    );
  }
}

export default AddEmployeeForm