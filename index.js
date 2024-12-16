// Create a new employee record from an array
const createEmployeeRecord = function (arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

// Create multiple employee records from an array of arrays
const createEmployeeRecords = function (arrOfArr) {
  return arrOfArr.map(createEmployeeRecord);
};

// Create a time-in event for the employee (record when they check in)
const createTimeInEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
};

// Create a time-out event for the employee (record when they check out)
const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
};

// Calculate hours worked for a given date
const hoursWorkedOnDate = function (date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date);
  const timeOut = this.timeOutEvents.find((event) => event.date === date);

  if (timeIn && timeOut) {
    return timeOut.hour - timeIn.hour;
  }
  return 0;
};

// Calculate wages earned for a specific date (hours worked * hourly pay)
const wagesEarnedOnDate = function (date) {
  const hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
};

// Calculate all wages for the employee by summing wages on each date
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map((event) => event.date);
  const totalWages = eligibleDates.reduce((memo, date) => {
    return memo + wagesEarnedOnDate.call(this, date);
  }, 0);
  return totalWages;
};

// Find an employee by their first name from an array of employee records
const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
};

// Calculate the total payroll for an array of employees
const calculatePayroll = function (arr) {
  return arr.reduce((memo, employee) => {
    return memo + allWagesFor.call(employee);
  }, 0);
};
