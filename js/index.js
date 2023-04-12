// show current day at the top of the calendar
$("#currentDay").text(moment().format("MM DD YYYY", ));


$('textarea').each(function() {
  const  currentHour = moment().hour();
  const hour = $(this).data('hour');
  if (hour < currentHour) {
    $(this).addClass('past');
  } else if (hour == currentHour) {
    $(this).addClass('present');
    $(this).removeClass('past');
  } else {
    $(this).addClass('future');
    $(this).removeClass('past');
    $(this).removeClass('present');
  }
});

// For coloring the past, present, and future time blocks
const now = moment().hour();

let schedule9am = $("#9AM");
let schedule10am = $("#10AM");
let schedule11am = $("#11AM");
let schedule12pm = $("#12PM");
let schedule1pm = $("#1PM");
let schedule2pm = $("#2PM");
let schedule3pm = $("#3PM");
let schedule4pm = $("#4PM");
let schedule5pm = $("#5PM");

let scheduleElArray = [
  schedule9am,
  schedule10am,
  schedule11am,
  schedule12pm,
  schedule1pm,
  schedule2pm,
  schedule3pm,
  schedule4pm,
  schedule5pm,
];

renderSchedule();
setInterval(updateTime, 1000);

// render schedule saved in local storage
function renderSchedule() {
  scheduleElArray.forEach((el) => {
    const savedEvent = localStorage.getItem(`timeBlock-${el.attr("id")}`);
    if (savedEvent !== null) {
      el.children(".description").val(savedEvent);
    }
    const hour = parseInt(el.attr("id").replace("AM", "").replace("PM", ""));
    if (hour < now) {
      el.addClass("past");
    } else if (hour === now) {
      el.addClass("present");
    } else {
      el.addClass("future");
    }
  });
}

// function for updating the time on the webpage
function updateTime() {
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

// function for handling clicks
function handleFormSubmit(event) {
  const text = $(this).siblings("textArea").val();
  console.log(text);
  const btnClicked = $(event.target);
  const targetText = btnClicked.siblings(".description");
  const targetTimeBlock = $(this).siblings("textArea").attr("data-hour");
  console.log(targetTimeBlock);
  localStorage.setItem(`timeBlock-${targetTimeBlock}`, text);
}

let saveBtn = $(".saveBtn");
saveBtn.on("click", handleFormSubmit);

for (let i = 9; i < 18; i++) {
  $(`textarea[data-hour="${i}"]`).val(localStorage.getItem(`timeBlock-${i}`));
};



