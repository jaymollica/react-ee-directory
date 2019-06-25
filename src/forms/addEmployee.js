import React from 'react';
import defaultImg from '../img/default.png';

class AddEmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      department: '',
      email: '',
      img: defaultImg,
      submitValue: 'Submit',
      submitDisabled: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);

    this.handleNewRandomEEClick = this.handleNewRandomEEClick.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.service.addEmployee(this.state);
    this.setState({
      submitValue: 'Submitted!',
      submitDisabled: true,
    });
  }

  handleImgChange(event) {
    this.setState({img: event.target.value});
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

  handleNewRandomEEClick(event) {
    event.preventDefault();
    var that = this;
    var newEE = this.props.service.getNewEmployee().then(function(result) {
      var newEE = JSON.parse(result);
      var names = newEE[0].name.split(" ");
      that.setState({
        firstName: names[0],
        lastName: names[1],
        title: newEE[0].position,
        department: '',
        email: newEE[0].email,
        img: newEE[0].photo,
      });
    })
    .catch(function() {
      // An error occurred
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={"form-group"}>
          <button type="submit" className={"btn btn-success"} onClick={this.handleNewRandomEEClick}>Generate Random Employee</button>
        </div>
        <div className={"form-group"}>
          <img className={"ee-img"} src={this.state.img} />
          <input type="text" name="img" className={"form-control"} value={this.state.img} onChange={this.handleImgChange} />
        </div>
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
        <button type="submit" disabled={this.state.submitDisabled} className={"btn btn-primary"}>{this.state.submitValue}</button> <a className={"btn btn-link"} href="/">Home</a>
      </form>
    );
  }
}

export default AddEmployeeForm