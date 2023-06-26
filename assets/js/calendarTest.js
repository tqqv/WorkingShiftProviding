const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let datePicked = document.getElementById("datePicked");

let activateDate = "start";
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth() + 1;
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let datesInfo = [
  "fake",
  "1-pns",
  "2-ps",
  "3-ps",
  "4-ps",
  "5-ps",
  "6-ps",
  "7-np",
  "8-np",
  "9-np",
  "10-np",
  "11-np",
  "12-np",
  "13-np",
  "14-np",
  "15-np",
  "16-np",
  "17-np",
  "18-np",
  "19-np",
  "20-np",
  "21-np",
  "22-pns",
  "23-pns",
  "24-pns",
  "25-pns",
  "26-pns",
  "27-pns",
  "28-pns",
  "29-pns",
  "30-pns",
  "31-pns",
];

let datePickedInfos = [
  "7:00-9:00|vaccine covid(10/20)?vac2(15/30)?vac2(15/30)?vac2(15/30)",
  "10:00-11:00|vaccine covid(10/20)?vac2(15/30)",
  "13:00-15:00|vaccine covid(10/20)?vac2(15/30)",
  "13:00-15:00|vaccine covid(10/20)?vac2(15/30)",
  "13:00-15:00|vaccine covid(10/20)?vac2(15/30)",
];
const renderCalendar = () => {
  console.log("hello");
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    let j = 1;
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday;
    if (
      i === date.getDate() &&
      currMonth === new Date().getMonth() + 1 &&
      currYear === new Date().getFullYear()
    ) {
      isToday = "active";
      console.warn("hehe bug: " + activateDate);
      if (activateDate == "start") {
        activateDate = i;
      }
      // getDataChoosenDate(activateDate);
      console.warn("hehe bug: " + activateDate);
    } else isToday = "";
    liTag += `<li id ="month_${currMonth}date_${i}" onclick="choosenDate(${i})" class="${
      isToday + " " + datesInfo[i].split("-")[1]
    }">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  datePicked.innerText = activateDate;
  currentDate.innerText = `${months[currMonth - 1]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();
// getDataChoosenDate(activateDate);

// handle prev - next button on calendar

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    console.log("activateDate: " + activateDate);
    storeDataTimeAndVacine(activateDate);
    // storeDataCurrentDate(activateDate);
    activateDate = null;
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth() + 1; // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function

    choosenDate(1);

    console.log("currMonth " + currMonth);
  });
});

// mine custom
const choosenDate = function (i) {
  let dateTimes = readCookie("month_" + currMonth + "date_" + i);
  console.log("dateTimes: " + dateTimes);
  // handle css toglle active class properties
  changeDate(i);
  // if confirmed =>  handle current date with time range to store oncookie done
  console.log("Last activateDate " + activateDate);

  storeDataTimeAndVacine(activateDate);
  // storeDataCurrentDate(activateDate);
  // storeDataCurrentVaccine(activateDate);
  // reset activate to choosen date
  activateDate = i;
  console.log("Current activate " + activateDate);

  // 1. reset checkbox of time ranges
  resetDataTimeAndVaccine();
  // resetCheckboxTime();

  // handle choosen date
  if (dateTimes) {
    console.log("This day is set already");
    // already => get time ranges in cookie to set back to time range on browser!
    getDataChoosenDate(activateDate);
  } else {
    console.log(
      "There is no time ranges set for this date yet. Now create on cookie"
    );
    // clear checkbox of time ranges
  }
};

// function getDataChoosenDate(datePickedInfos) {
//   datePickedInfos.forEach((e) => {
//     let timeRange = e.split("|")[0];
//     let vacList = e.split("|")[1].split("?");
//     vacList.forEach((v) => {
//       let vName = v.split("(")[0];
//       let vQuan = v.split("(")[1].slice(0, -1);

//     });
//   });
// }

function getDataChoosenDate(datePickedInfos) {
  let html = ` <!-- form add time range in date -->
  <div class="addTimeRangeForm" id="addTimeRangeFormPopup">
      <form action="">
          <label for="timeRanges">Choose new time range:</label>
          <select id="timeRange" name="timeRangelist" form="" >
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        <input type="submit" name="" id="" value="Confirm">
         <button type="button" class="deletebtn" onclick="closeForm2()">Cancel</button>
      </form>
  </div>
  <!-- form add vaccine in time range -->

  <div class="addVaccineForm" id="addVaccineFormPopup">
  <form action="">
    <label for="">Vaccine ID </label><input type="text" name="vacId" id="vacId" placeholder="ex: A001"><br>
    <label for="">Vaccine name </label><input type="text" name="vacName" id="vacName" placeholder="ex: Vaccine 1"><br>
    <label for="">Vaccine quantity </label><input type="text" name="vacQuan" id="vacQuan" placeholder="ex: 10 slots"><br>
    <input type="submit" name="" id="" value="Confirm">
     <button type="button" class="deletebtn" onclick="closeForm()">Cancel</button>
  </form>
  </div>`;
  datePickedInfos.forEach((e) => {
    let timeRange = e.split("|")[0];
    let vacList = e.split("|")[1].split("?");
    html += `
        <div class="container perTimeRange">
          <article class="article" id="timeRangeInfo">  
            <div class="col-sm-3 cusColor hF timeRange">
              <div>${timeRange}</div> 
            </div>
            <div class="col-sm-8 mint hF timeRangeInfo">
      `;
    vacList.forEach((v) => {
      let vName = v.split("(")[0];
      let vQuan = v.split("(")[1].slice(0, -1);
      html += `
            <div class="perVac">

        <h7 class="vacId col-sm-6">2</h7>
          <h7 class="vacName col-sm-6">${vName}</h7>
          <h7 class="vacQuan col-sm-3">${vQuan}</h7> 
          <h7 class="vacQuan col-sm-3">Edit</h7> 
      
            </div>
        `;
    });
    html += `
            </div>
            <button class="btn-addVaccine" onclick="openForm()">+</button>
            <div class="col-sm-1 yellow hF ">
              <button> 🚮</button>
            </div>
          </article>
        </div>
      `;
  });
  html += "</div>";
  document.getElementById("dayInfo").innerHTML = html;
}

getDataChoosenDate(datePickedInfos);
