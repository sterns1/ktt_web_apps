function load_current_month() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  document.getElementById("current_year").innerHTML = date.getFullYear()
  document.getElementById("month_name").innerHTML = month
}