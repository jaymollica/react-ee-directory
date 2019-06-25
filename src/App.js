import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './data.js';
import AddEmployeeForm from './forms/addEmployee.js';
import UpdateEmployeeForm from './forms/updateEmployee.js';
import DeleteEmployeeForm from './forms/deleteEmployee.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import defaultImg from './img/default.png';

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

class DeleteEmployee extends Component {
  state = {
    id: this.props.match.params.id,
  }

  render() {
    return (
      <div className={"container"}>
        <h2>Delete Employee</h2>
        <DeleteEmployeeForm service={window.employeeService} id={this.state.id} />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className={"title"}>{this.props.text}</h1>
      </div>
    );
  }
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

    if("img" in this.props.employee){
      var imgSrc = this.props.employee.img;
    }
    else {
      var imgSrc = defaultImg;
    }

    return (
        <tr>
          <td>
            <img className={"ee-list-img"} src={imgSrc} />
          </td>
          <td>
            <a href={"employees/" + this.props.employee.id}>
                {this.props.employee.firstName} {this.props.employee.lastName}
            </a>
          </td>
          <td>
            <p>{this.props.employee.department}</p>
          </td>
          <td className={"text-right"}>
            <a className={"btn btn-primary"} href={"update/" + this.props.employee.id}>
              Update
            </a>
          </td>
          <td className={"text-right"}>
            <a className={"btn btn-danger"} href={"delete/" + this.props.employee.id}>
              Delete
            </a>
          </td>
        </tr>
    );
  };
}

class EmployeeList extends Component {
  render() {
    if(this.props.employees.length === 0) {
      return (
        <p>Don&rsquo;t see who you&rsquo;re looking for? Add them <a href={"/add"}>here</a>.</p>
      );
    } else {
      let items = this.props.employees.map(employee => {
        return (
          <EmployeeListItem key={employee.id} employee={employee} />
        );
      });
      return (
        <table className={"table"}>
          <tbody>
            {items}
            <tr>
              <td colSpan="5" className={"text-right"}>
                <a href="/add" className={"btn btn-success btn-add"}>Add Employee</a>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };
}

class HomePage extends Component {
  state = {
    employees: this.props.service.getEmployees(),
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
        <p><a href={"mailto:"+this.state.employee.email}>{this.state.employee.email}</a></p>
        <div>
          <a className={"btn btn-primary"} href={"/update/" + this.state.employee.id}>
            Update
          </a>
          <a className={"btn btn-danger"} href={"/delete/" + this.state.employee.id}>
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
        <Route path="/delete/:id" component={DeleteEmployee} />
      </div>
    </Router>
  );
}

export default AppRouter;
