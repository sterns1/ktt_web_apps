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
    current_date.getMonth(), current_date.getFullYear())

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

function get_next_month() {
  var month_info = _get_displayed_date()
  var displayed_date = new Date(`${month_info.year}, ${month_info.month}, 1`)
  if(displayed_date.getMonth() == 11) {
    displayed_date = new Date(
      `${displayed_date.getFullYear() + 1}, 1, 1`)
  } else {
    //.getMonth is 0 based, but the constructor isn't.
    displayed_date = new Date(
      `${displayed_date.getFullYear()}, ${displayed_date.getMonth() + 2}, 1`)
  }
  const month = displayed_date.toLocaleString('default', { month: 'long' })
  document.getElementById(
    "current_year").innerHTML = displayed_date.getFullYear()
  document.getElementById("month_name").innerHTML = month

  var month_days = _get_day_info(
    displayed_date.getMonth(), displayed_date.getFullYear())
  console.log(month_days)
}


function _get_displayed_date() {
  var displayed_date = {}
  var displayed_month = document.getElementById(
    "month_name").innerText.toString()
  var displayed_year = document.getElementById(
    "current_year").innerText.toString()
  return {"month": displayed_month, "year": displayed_year}
}


function _get_day_info(month, year) {
  console.log(month, year)
  month = month + 1
  const original_date = new Date(`${year}, ${month}, 1`)
  console.log(original_date)
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

  var padded_schedule_days = []
  for(day of schedule_days) {
    console.log(day)
    console.log(typeof(day.weekday))
    for(i in day.weekday) {
      padded_schedule_days.push({"weekday": -1, "number": -1})
    }
  }
  console.log(padded_schedule_days)
  padded_schedule_days.push.apply(padded_schedule_days, schedule_days)
  console.log(padded_schedule_days)
  return schedule_days
}