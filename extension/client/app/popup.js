let recordActivityToggle = document.getElementById("recordActivityToggle");
let hideViewsToggle = document.getElementById("hideViewsToggle");

recordActivityToggle.addEventListener("change", function() {
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `recordActivityToggle: updated to ${this.checked}`);
});

hideViewsToggle.addEventListener("change", function() {
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `hideViewsToggle: updated to ${this.checked}`);
});
