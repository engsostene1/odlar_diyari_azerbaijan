/* ==========================================================
   Dodo Trails - script.js
   Original JavaScript written for this project.
   1. Mobile navigation toggle
   2. Footer year
   3. Contact form: validation feedback + confirmation message
   4. Trip planner: live budget estimate (bonus feature)
   ========================================================== */

(function () {
  "use strict";

  /* 1. Mobile navigation ---------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var list = document.querySelector(".nav__list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* 2. Footer year ---------------------------------------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* 3. Contact form --------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var box = document.getElementById("confirmation");
    var budget = document.getElementById("budget");
    var budgetOut = document.getElementById("budget-out");

    // Do not allow travel dates in the past
    var dateInput = document.getElementById("travel-date");
    if (dateInput) { dateInput.min = new Date().toISOString().split("T")[0]; }

    // Live label for the range slider
    function showBudget() {
      budgetOut.textContent = "USD " + Number(budget.value).toLocaleString("en-US");
    }
    if (budget && budgetOut) {
      budget.addEventListener("input", showBudget);
      showBudget();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();           // no server in this student project
      if (!form.checkValidity()) {      // shows the browser's own error bubbles
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var name = String(data.get("name")).trim();
      var email = String(data.get("email")).trim();
      var topic = form.elements["topic"].selectedOptions[0].text;

      // Build the message with textContent (never innerHTML) so user input
      // cannot inject markup.
      box.querySelector("[data-name]").textContent = name;
      box.querySelector("[data-email]").textContent = email;
      box.querySelector("[data-topic]").textContent = topic;

      box.classList.add("is-visible");
      box.setAttribute("tabindex", "-1");
      box.focus();                      // moves screen-reader focus to the message
      box.scrollIntoView({ behavior: "smooth", block: "start" });
      form.reset();
      if (budget) { showBudget(); }
    });
  }

  /* 4. Trip planner --------------------------------------- */
  var planner = document.getElementById("planner-form");
  if (planner) {
    // Illustrative estimates in USD, NOT official prices.
    var STAY_PER_NIGHT = { budget: 45, mid: 120, luxury: 330 };
    var FOOD_PER_DAY = 25;                 // per person per day
    var TRANSPORT_PER_DAY = 18;            // shared car / taxi / bus mix per day
    var out = {
      stay: document.getElementById("out-stay"),
      food: document.getElementById("out-food"),
      transport: document.getElementById("out-transport"),
      activities: document.getElementById("out-activities"),
      total: document.getElementById("out-total"),
      perPerson: document.getElementById("out-pp"),
      plan: document.getElementById("out-plan")
    };

    function usd(n) { return "USD " + Math.round(n).toLocaleString("en-US"); }

    function calculate() {
      var nights = Math.max(1, Math.min(30, parseInt(planner.elements["nights"].value, 10) || 1));
      var people = Math.max(1, Math.min(10, parseInt(planner.elements["people"].value, 10) || 1));
      var tier = planner.elements["tier"].value;
      var rooms = Math.ceil(people / 2);
      var picks = planner.querySelectorAll('input[name="activity"]:checked');
      var actTotal = 0;
      var names = [];
      picks.forEach(function (p) {
        actTotal += Number(p.value) * people;
        names.push(p.getAttribute("data-label"));
      });

      var stay = STAY_PER_NIGHT[tier] * nights * rooms;
      var food = FOOD_PER_DAY * (nights + 1) * people;
      var transport = TRANSPORT_PER_DAY * (nights + 1);
      var total = stay + food + transport + actTotal;

      out.stay.textContent = usd(stay);
      out.food.textContent = usd(food);
      out.transport.textContent = usd(transport);
      out.activities.textContent = usd(actTotal);
      out.total.textContent = usd(total);
      out.perPerson.textContent = usd(total / people);
      out.plan.textContent = names.length
        ? "Your trip highlights: " + names.join(", ") + "."
        : "Tick some activities to build your highlights list.";
    }

    planner.addEventListener("input", calculate);
    planner.addEventListener("change", calculate);
    calculate();
  }
})();
