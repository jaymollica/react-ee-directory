import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './data.js';
import AddEmployeeForm from './forms/addEmployee.js';
import UpdateEmployeeForm from './forms/updateEmployee.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class Index extends Component {
  render() {
    return (
      <div className={"container"}>
        <HomePage service={window.employeeService} />
      </div>
    );
  }
}

class EmployeePage extends Component {
  state = {
    id: this.props.match.params.id,
  }
  render() {
    return (
      <div className={"container"}>
        <EmployeeDetail employeeId={this.state.id} service={window.employeeService} />
      </div>
    );
  }
}

class AddEmployee extends Component {

  render() {
    return (
      <div className={"container"}>
        <h2>Add Employee</h2>
        <AddEmployeeForm service={window.employeeService} />
      </div>
    );
  }
  
}

class UpdateEmployee extends Component {

  state = {
    id: this.props.match.params.id,
  }

  render() {
    return (
      <div className={"container"}>
        <h2>Update Employee</h2>
        <UpdateEmployeeForm service={window.employeeService} id={this.state.id} />
      </div>
    );
  }
  
}

class Header extends Component {
  render() {
      return <h1 className="title">{this.props.text}</h1>
  };
}

class SearchBar extends Component {
  
  searchHandler = (event) => {
    var term = event.target.value;
    this.props.searchHandler(term);
  }
  render() {
    return (
      <form>
        <div className={"form-group"}>
          <input className={"form-control"} placeholder="Search for..." onChange={this.searchHandler} />
        </div>
      </form>
    );
  }
}

class EmployeeListItem extends Component {
  render() {
    return (
        <tr>
          <td>
            <a href={"employees/" + this.props.employee.id}>
                {this.props.employee.firstName} {this.props.employee.lastName}
            </a>
          </td>
          <td>
            <a className={"btn btn-primary"} href={"update/" + this.props.employee.id}>
              Update
            </a>
          </td>
          <td>
            <a className={"btn btn-danger"} herf={"delete/" + this.props.employee.id}>
              Delete
            </a>
          </td>
        </tr>
    );
  };
}

class EmployeeList extends Component {
  render() {
    let items = this.props.employees.map(employee => {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
      );
    });
    return (
      <table className={"table"}>
          {items}
      </table>
    );
  };
}

class HomePage extends Component {
  state = {
    employees: this.props.service.employees,
  };

  searchHandler = (term) => {
    this.props.service.findByName(term).then( function(result) {
      this.setState({employees: result});
    }.bind(this));
  };

  render() {
    return (
      <div className={"container"}>
          <Header text="Employee Directory" />
          <SearchBar searchHandler={this.searchHandler} />
          <EmployeeList employees={this.state.employees} />
      </div>
    );
  };
}

class EmployeeDetail extends Component {
  state = {
    employee: {},
  };

  componentDidMount(prevProps) {
    this.props.service.findById(this.props.employeeId).then( function(result) {
      this.setState({employee: result});
    }.bind(this));
  };

  render() {
    return (
      <div className={"container"}>
        <Header text="Employee Details"/>
        <h2>{this.state.employee.firstName} {this.state.employee.lastName}</h2>
        <p>{this.state.employee.title} &middot; {this.state.employee.department}</p>
        <p><a href={"mailto:"+this.state.employee.email}>this.state.employee.email</a></p>
        <div>
          <a className={"btn btn-primary"} href={"/update/" + this.state.employee.id}>
            Update
          </a>
          <a className={"btn btn-danger"} herf={"/delete/" + this.state.employee.id}>
            Delete
          </a>
          <a className={"btn btn-link"} href="/">
            Home
          </a>
        </div>
      </div>
    );
  }
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/employees/:id" component={EmployeePage} />
        <Route path="/add" component={AddEmployee} />
        <Route path="/update/:id" component={UpdateEmployee} />
      </div>
    </Router>
  );
}

export default AppRouter;
