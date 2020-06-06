let recordActivityToggle = document.getElementById("recordActivityToggle");
let hideViewsToggle = document.getElementById("hideViewsToggle");

localStorage.setItem("recordActivityToggle", "true");
localStorage.setItem("hideViewsToggle", "false");

recordActivityToggle.addEventListener("change", function() {
  localStorage.setItem("recordActivityToggle", this.checked);
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `recordActivityToggle: updated to ${this.checked}`);
});

hideViewsToggle.addEventListener("change", function() {
  localStorage.setItem("hideViewsToggle", this.checked);
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `hideViewsToggle: updated to ${this.checked}`);
});
