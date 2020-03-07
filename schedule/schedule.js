function load_current_month() {
  // Updates the current month and year as a starting place for the schedule.
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' })
  document.getElementById("current_year").innerHTML = date.getFullYear()
  document.getElementById("month_name").innerHTML = month
}

function load_days() {
  const current_date = new Date()
  // Sets the month's start weekday, and number of days.
  var schedule_days = _get_day_info(
    current_date.getMonth() + 1, current_date.getFullYear())

  // Actually add list elements of day info.
  var weekdays = document.getElementById(
    "weekdays").getElementsByTagName("li");
  for(day of schedule_days) {
    var node = document.createElement("LI")
    node.setAttribute("weekday", weekdays[day.weekday].innerText)
    var text_node = document.createTextNode(day.number.toString())
    node.appendChild(text_node)
    document.getElementById("number_days").appendChild(node)
  }
}

function get_next_month() {
  var displayed_date = _get_displayed_date()

  const current_date = new Date()
  // Sets the month's start weekday, and number of days.
  var schedule_days = _get_day_info(displayed_date.month, displayed_date.year)

  // Actually add list elements of day info.
  var weekdays = document.getElementById(
    "weekdays").getElementsByTagName("li")
  for(day of schedule_days) {
    var node = document.createElement("LI")
    node.setAttribute("weekday", weekdays[day.weekday].innerText)
    var text_node = document.createTextNode(day.number.toString())
    node.appendChild(text_node)
    document.getElementById("number_days").appendChild(node)
  }
}


function _get_displayed_date() {
  var displayed_date = {}
  return displayed_date
}


function _get_day_info(month, year) {
  const original_date = new Date(`${year}, ${month}, 1`)
  var date = new Date(`${year}, ${month}, 1`)
  var total_days = 1
  var day_info = {}
  var schedule_days = []
  while(date.getMonth() === original_date.getMonth()) {
    day_info = {"weekday": date.getDay(), "number": total_days}
    schedule_days.push(day_info)
    total_days += 1
    date.setDate(date.getDate() + 1)
  }
  return schedule_days
}