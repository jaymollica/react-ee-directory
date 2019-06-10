import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './data.js';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
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
      <div>
        <EmployeeDetail employeeId={this.state.id} service={window.employeeService} />
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
        <input placeholder="Search for..." onChange={this.searchHandler} />
      </form>
    );
  }
}

class EmployeeListItem extends Component {
  render() {
    return (
        <li>
            <a href={"employees/" + this.props.employee.id}>
                {this.props.employee.firstName} {this.props.employee.lastName}
            </a>
        </li>
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
      <ul>
          {items}
      </ul>
    );
  };
}

class HomePage extends Component {
  state = {
    employees: [],
  };

  searchHandler = (term) => {
    this.props.service.findByName(term).then( function(result) {
      this.setState({employees: result});
    }.bind(this));
  };

  render() {
    return (
      <div>
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
      <div>
        <Header text="Employee Details"/>
        <h2>{this.state.employee.firstName} {this.state.employee.lastName}</h2>
        <p>{this.state.employee.title}</p>
      </div>
    );
  }
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/employees/:id" component={EmployeePage} />
      </div>
    </Router>
  );
}

export default AppRouter;
