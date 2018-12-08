var config = {
  apiKey: "AIzaSyBZf2ZREFk3dylGr5_hUqUzRTpAElTgAaE",
  authDomain: "timesheetproj-5604a.firebaseapp.com",
  databaseURL: "https://timesheetproj-5604a.firebaseio.com",
  projectId: "timesheetproj-5604a",
  storageBucket: "timesheetproj-5604a.appspot.com",
  messagingSenderId: "748618922220"
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var role = "";
var start = "";
var worked = "";
var rate = "";
var total = "";

$("#add-user").on("click", function(event) {
  event.preventDefault();
  name = $("#name-input")
    .val()
    .trim();
  role = $("#role-input")
    .val()
    .trim();
  start = $("#start-input")
    .val()
    .trim();
  worked = $("#worked-input")
    .val()
    .trim();
  rate = $("#rate-input")
    .val()
    .trim();
  total = $("#total-input")
    .val()
    .trim();

  var newEmp = {
    name: name,
    role: role,
    worked: worked,
    rate: rate,
    total: total,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  database.ref().push(newEmp);
});
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().start);
    console.log(childSnapshot.val().rate);
    var row = $("<tr>");
    var nameCell = $("<td>");
    var roleCell = $("<td>");
    var startCell = $("<td>");
    var rateCell = $("<td>");
    nameCell.text(childSnapshot.val().name);
    roleCell.text(childSnapshot.val().role);
    startCell.text(childSnapshot.val().start);
    rateCell.text(childSnapshot.val().rate);
    row.append(nameCell);
    row.append(roleCell);
    row.append(startCell);
    row.append(rateCell);
    $("#body").append(row);
    console.log("table row is " + row.nameCell);
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
