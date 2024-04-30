/*global $, jQuery, alert*/
$(document).ready(function () {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function () {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
      menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function () {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function (e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function () {
    typed.typed({
      strings: ["Lokman Hakim.", "Designer.", "Analyst.", "Takaful Advisor."],
      typeSpeed: 50,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
  });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function () {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's default one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function () {

  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})

// ========================================================================= //
//  Copy to clipboard
// ========================================================================= //

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const textToCopy = element.textContent;

  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select and copy the text
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");

  // Remove the temporary input
  document.body.removeChild(tempInput);

  // Alert or provide feedback to the user
  alert("Text copied to clipboard!");
}

// ========================================================================= //
//  Financial Analysis Table
// ========================================================================= //

function calculateYearlyIncome() {
  const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
  const yearlyIncome = monthlyIncome * 12;
  document.getElementById('yearlyIncome').textContent = yearlyIncome.toFixed(2);
  calculateSavings(monthlyIncome);
  calculateIncomeReplacement(); // Recalculate income replacement after changing monthly income
  calculateDebtReplacement(); // Recalculate debt replacement after changing monthly income
}

function calculateSavings(monthlyIncome) {
  const minSavings = monthlyIncome * 3;
  const maxSavings = monthlyIncome * 6;
  document.getElementById('minSavings').textContent = minSavings.toFixed(2);
  document.getElementById('maxSavings').textContent = maxSavings.toFixed(2);
}

function calculateIncomeReplacement() {
  const yearlyIncome = parseFloat(document.getElementById('yearlyIncome').textContent);
  const isSingle = document.getElementById('singleIncomeReplacement');
  const isMarried = document.getElementById('marriedIncomeReplacement');

  let singleIncomeReplacement = 0;
  let marriedIncomeReplacement = 0;

  if (isSingle) {
    singleIncomeReplacement = yearlyIncome * 5; // 5 years of income
  }

  if (isMarried) {
    marriedIncomeReplacement = yearlyIncome * 10; // 10 years of income
  }

  document.getElementById('singleIncomeReplacement').textContent = singleIncomeReplacement.toFixed(2);
  document.getElementById('marriedIncomeReplacement').textContent = marriedIncomeReplacement.toFixed(2);
}

function calculateDebt() {
  const debtAmount = parseFloat(document.getElementById('debtAmount').value);
  const debtReplacement = debtAmount;
  document.getElementById('debtReplacement').textContent = debtReplacement.toFixed(2);
}

function calculateDebtReplacement() {
  const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
  const yearlyIncome = monthlyIncome * 12;
  document.getElementById('yearlyIncome').textContent = yearlyIncome.toFixed(2);
  calculateProposedHibah(yearlyIncome);
}

function calculateProposedHibah(yearlyIncome) {
  const proposedHibah = 10 * yearlyIncome;
  document.getElementById('proposedHibah').textContent = proposedHibah.toFixed(2);
}

/*-------------------------CURRENT DATE & TIME-------------------------------*/
function updateDateTime() {
  var currentDate = new Date();
  var dateElement = document.getElementById('currentDate');
  var timeElement = document.getElementById('currentTime');

  dateElement.textContent = currentDate.toDateString();
  timeElement.textContent = currentDate.toLocaleTimeString();
}

/*------------------UPDATE DATE & TIME EVERY SECOND-------------------------*/
setInterval(updateDateTime, 1000);

/*---------------------------------LEDGER-----------------------------------*/
var balance = 0;

function submitTransaction() {
  // Get form values
  var transactionType = document.getElementById('transactionType').value;
  var description = document.getElementById('description').value;
  var amount = parseFloat(document.getElementById('amount').value);

  // Validate amount
  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  // Update balance
  if (transactionType === 'income') {
    balance += amount;
  } else {
    balance -= amount;
  }

  // Create ledger entry
  var entry = document.createElement('li');
  entry.className = 'ledger-entry';
  entry.textContent = `${transactionType.toUpperCase()} - ${description} - RM ${amount.toFixed(2)}`;

  // Add delete button
  var deleteButton = document.createElement('span');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = '🚮';
  deleteButton.onclick = function () {
    deleteTransaction(entry, amount, transactionType);
  };

  entry.appendChild(deleteButton);

  // Append entry to ledger
  document.getElementById('ledgerEntries').appendChild(entry);

  // Update balance display
  document.getElementById('balanceAmount').textContent = `RM ${balance.toFixed(2)}`;

  // Clear form
  document.getElementById('ledgerForm').reset();
}

function deleteTransaction(entry, amount, transactionType) {
  // Update balance
  if (transactionType === 'income') {
    balance -= amount;
  } else {
    balance += amount;
  }

  // Remove entry from ledger
  entry.remove();

  // Update balance display
  document.getElementById('balanceAmount').textContent = `RM ${balance.toFixed(2)}`;
}

/*------------------------------TASK & GOALS---------------------------------*/
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);

    // Add a delete button to each task
    var deleteButton = document.createElement("delete-button");
    deleteButton.appendChild(document.createTextNode(" 🚮"));
    deleteButton.onclick = function () {
      taskList.removeChild(li);
    };
    li.appendChild(deleteButton);

    // Clear the input field
    taskInput.value = "";
  }
}

/*-----------------------------WORKSPACE MANAGER-----------------------------*/
function validateTimeInput(input) {
  // Ensure that the entered value is a valid number and within the allowed range
  var value = parseInt(input.value, 10);
  if (isNaN(value) || value < 0 || value > 60) {
    input.value = ''; // Clear the input if it's not a valid number or out of range
  }
}

function addWorkspaceEntry() {
  var projectInput = document.getElementById('projectInput');
  var projectType = document.getElementById('projectType');
  var timeInHourInput = document.getElementById('timeInHourInput');
  var timeInMinuteInput = document.getElementById('timeInMinuteInput');
  var timeInMeridiemInput = document.getElementById('timeInMeridiemInput');
  var timeOutHourInput = document.getElementById('timeOutHourInput');
  var timeOutMinuteInput = document.getElementById('timeOutMinuteInput');
  var timeOutMeridiemInput = document.getElementById('timeOutMeridiemInput');
  var statusInput = document.getElementById('statusInput');
  var appointmentWithInput = document.getElementById('appointmentWithInput');
  var workspaceList = document.getElementById('workspaceList');

  var timeIn = timeInHourInput.value + ':' + timeInMinuteInput.value + ' ' + timeInMeridiemInput.value;
  var timeOut = timeOutHourInput.value + ':' + timeOutMinuteInput.value + ' ' + timeOutMeridiemInput.value;

  // Convert the time strings to Date objects for easier manipulation
  var currentDate = new Date(); // Current date
  var timeInDate = new Date(currentDate.toDateString() + ' ' + timeIn);
  var timeOutDate = new Date(currentDate.toDateString() + ' ' + timeOut);

  // Calculate the time difference in milliseconds
  var timeDiff = timeOutDate - timeInDate;

  // Convert the time difference to hours
  var hours = timeDiff / (1000 * 60 * 60);

  // Validate the entered time values
  if (
    validateTimeValues(timeInHourInput.value, timeInMinuteInput.value) &&
    validateTimeValues(timeOutHourInput.value, timeOutMinuteInput.value) &&
    projectInput.value.trim() !== ''
  ) {
    // Check if the time difference exceeds 24 hours
    if (hours < 0 || hours > 24) {
      alert('Please ensure that Time Out is later than Time In and both are within the same day.');
      return;
    }

    var selectedProjectType = projectType.options[projectType.selectedIndex].text;

    // Calculate the time difference in milliseconds after adjusting the date
    timeDiff = timeOutDate - timeInDate;

    // Convert the time difference to hours
    hours = timeDiff / (1000 * 60 * 60);

    var li = document.createElement('li');
    li.innerHTML = `<strong>Project:</strong> ${projectInput.value}<br>
                            <strong>Project Type:</strong> ${selectedProjectType}<br>
                            <strong>Time In:</strong> ${timeIn}<br>
                            <strong>Time Out:</strong> ${timeOut}<br>
                            <strong>Hours Worked:</strong> ${hours.toFixed(2)} hours<br>
                            <strong>Status:</strong> ${statusInput.value}<br>
                            <strong>Appointment With:</strong> ${appointmentWithInput.value}
                            <button onclick="deleteWorkspaceEntry(this)">Delete</button>`;
    workspaceList.appendChild(li);

    // Clear input fields
    projectInput.value = '';
    projectType.selectedIndex = 0; // Reset the project type dropdown to the default option
    timeInHourInput.value = '';
    timeInMinuteInput.value = '';
    timeOutHourInput.value = '';
    timeOutMinuteInput.value = '';
    statusInput.value = '';
    appointmentWithInput.value = '';
  } else {
    alert('Please enter a valid time in the format HH:MM AM/PM for both Time In and Time Out. Also, please insert all relevant information.');
  }
}

function deleteWorkspaceEntry(button) {
  var li = button.parentElement;
  li.remove();
}

function validateTimeValues(hour, minute) {
  // Validate that the entered time values are in the correct range
  var hourValue = parseInt(hour, 10);
  var minuteValue = parseInt(minute, 10);

  if (
    isNaN(hourValue) || isNaN(minuteValue) ||
    hourValue < 0 || hourValue > 12 ||
    minuteValue < 0 || minuteValue > 60
  ) {
    return false;
  }

  return true;
}

/*---------------------- JOURNAL MANAGER -------------------------------*/
function addJournalEntry() {
  var journalInput = document.getElementById('journalInput');
  var journalHourInput = document.getElementById('journalHourInput');
  var journalMinuteInput = document.getElementById('journalMinuteInput');
  var journalMeridiemInput = document.getElementById('journalMeridiemInput');
  var journalList = document.getElementById('journalList');

  // Validate the entered time values
  if (validateTimeValues(journalHourInput.value, journalMinuteInput.value) && journalInput.value.trim() !== '') {
    var time = journalHourInput.value + ':' + journalMinuteInput.value + ' ' + journalMeridiemInput.value;

    var li = document.createElement('li');
    li.innerHTML = `<strong>Time:</strong> ${time}<br>
                      <strong>Entry:</strong> ${journalInput.value}
                      <button onclick="deleteJournalEntry(this)">Delete</button>`;
    journalList.appendChild(li);

    // Clear input fields
    journalInput.value = '';
    journalHourInput.value = '';
    journalMinuteInput.value = '';
  } else {
    alert('Please enter a valid time in the format HH:MM AM/PM and provide a journal entry.');
  }
}

function deleteJournalEntry(button) {
  var li = button.parentElement;
  li.remove();
}

/*---------------------- PRINT DOCUMENT -------------------------------*/
function printDocument() {
    var printContent =
        "<div class='printable-content'>" +
        "<h1>DAILY LOG</h1>" +
        "<div class='date-time'>" +
        "<h3 id='currentDate'>" + document.getElementById('currentDate').textContent + "</h3>" +
        "<h3 id='currentTime'>" + document.getElementById('currentTime').textContent + "</h3>" +
        "</div>" +
        "<fieldset>" +
        "<legend><h5>LEDGER</h5></legend>" +
        document.getElementById('ledgerEntries').outerHTML +
        "<div id='balance'>" +
        "<h3>Balance</h3>" +
        "<p id='balanceAmount'>" + document.getElementById('balanceAmount').textContent + "</p>" +
        "</div>" +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>TASK MANAGER</h5></legend>" +
        document.getElementById('taskList').outerHTML +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>WORKSPACE MANAGER</h5></legend>" +
        document.getElementById('workspaceList').outerHTML +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>JOURNAL</h5></legend>" +
        document.getElementById('journalList').outerHTML +
        "</fieldset>" +
        "</div>";

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.write('<html><head><title>Daily Log</title>' +
        '<link rel="stylesheet" type="text/css" href="css/print.css"></head>' +
        '<body>' + printContent + '</body></html>');

    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    document.body.removeChild(iframe);
}

