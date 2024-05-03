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
      strings: ["Your Name.", "What You Do 1.", "What You Do 2.", "What You Do 3."],
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