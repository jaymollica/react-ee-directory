window.employeeService = (function () {

  var findByName = function(term) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    var results = storedEmployees.filter(function (element) {
        var fullName = element.firstName + " " + element.lastName;
        return fullName.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });

    let promiseEmployee =  new Promise(function(resolve, reject) {
      resolve(results);
    });

    promiseEmployee.then(
      function(result) { return result; },
    );

    return promiseEmployee;

  }

  var findById = function (id) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    var employee = null;
    var l = storedEmployees.length;
    for (var i = 0; i < l; i++) {
        if (storedEmployees[i].id == id) {
            employee = storedEmployees[i];
            break;
        }
    }

    let promiseEmployee =  new Promise(function(resolve, reject) {
      resolve(employee);
    });

    promiseEmployee.then(
      function(result) { return result; },
    );

    return promiseEmployee;
  }

  var findByDepartment = function(department) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    var results = storedEmployees.filter(function (element) {
        var eeDept = element.department;
        return eeDept.toLowerCase().indexOf(department.toLowerCase()) > -1;
    });

    let promiseEmployees =  new Promise(function(resolve, reject) {
      resolve(results);
    });

    promiseEmployees.then(
      function(result) { return result; },
    );

    return promiseEmployees;
  }

  var addEmployee = function(employee) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    const maxId = storedEmployees.reduce(
      (max, storedEmployees) => (storedEmployees.id > max ? storedEmployees.id : max), storedEmployees[0].id
    );
    employee.id = maxId + 1;
    storedEmployees.push(employee);
    localStorage.setItem('employees', JSON.stringify(storedEmployees));
    var allEmployees = localStorage.getItem('employees');
  }

  var updateEmployee = function(employee) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    for (var key in storedEmployees) {
      if (storedEmployees[key].id == employee.id) {
        storedEmployees[key] = employee;
        localStorage.setItem('employees', JSON.stringify(storedEmployees));
        break;
      }
    }
  }

  var deleteEmployee = function(employee) {
    var storedEmployees = JSON.parse(localStorage.getItem('employees'));
    for (var key in storedEmployees) {
      if (storedEmployees[key].id == employee.id) {
        storedEmployees.splice(key,1);
        localStorage.setItem('employees', JSON.stringify(storedEmployees));
        break;
      }
    }
  }

  var getEmployees = function() {
    var allEmployees = JSON.parse(localStorage.getItem('employees'));
    return allEmployees;
  }

  var getNewEmployee = function() {

    var eeURL = "https://uifaces.co/api?limit=1&random";

    //ui face api does not provide a dept, so pick one from a list
    var defaultsDepts = [
      'Engineering',
      'Corporate',
      'Marketing',
      'Operations',
      'Finance',
    ];
    var randDept = defaultsDepts[Math.floor(Math.random() * defaultsDepts.length)];

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        response[0].department = randDept;
        resolve(response[0]);
      };
      xhr.onerror = reject;
      xhr.open('GET', eeURL);
      xhr.setRequestHeader("X-API-KEY","bbe4b56b32f2e0343e04be4d80c35c");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
      xhr.send();
    });
  }

  var init = function() {
    //localStorage.clear();
    // only prepopulate localstorage if employees are not present
    if (localStorage.getItem("employees") === null) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  },

  // some seed data for the directory
  employees = [
    {"id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "mobilePhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/44/200/200", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
    {"id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "mobilePhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/45/200/200", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
    {"id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "mobilePhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/46/200/200", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
    {"id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "mobilePhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/47/200/200", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
    {"id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "mobilePhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/50/200/200", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
    {"id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "mobilePhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/70/200/200", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
    {"id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/54/200/200", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
    {"id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/57/200/200", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
    {"id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/58/200/200", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
    {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/59/200/200", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
    {"id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "img": "https://picsum.photos/id/44/200/200", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
    {"id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "img": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
  ];

  init();

  return {
    findById: findById,
    findByName: findByName,
    addEmployee: addEmployee,
    updateEmployee: updateEmployee,
    getEmployees: getEmployees,
    getNewEmployee: getNewEmployee,
    deleteEmployee: deleteEmployee,
  };

}());
