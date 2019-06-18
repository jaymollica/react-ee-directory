import React from 'react'
import { Redirect } from 'react-router-dom'

class DeleteEmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      id: '',
      redirectToReferrer: false,
    };

    this.props.service.findById(this.props.id).then( function(result) {
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        id: result.id,
      });
    }.bind(this));

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.service.deleteEmployee(this.state);
    this.setState({
      redirectToReferrer: true,
    });
  }

   render() {
    const redirectToReferrer = this.state.redirectToReferrer;

      if (redirectToReferrer === true) {
        alert(this.state.firstName+' '+this.state.lastName+' has been deleted from the directory.');
        return <Redirect to="/" />
      }
      else {
        return (
          <form onSubmit={this.handleSubmit}>
          <p>Are you sure you want to delete <strong>{this.state.firstName} {this.state.lastName}</strong> from the employee directory?</p>
          <button type="submit" className={"btn btn-primary"}>Delete</button>  <a className={"btn btn-link"} href="/">Cancel</a>
          </form>
        );
      }

  }

}

export default DeleteEmployeeForm