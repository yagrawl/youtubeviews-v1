let recordActivityToggle = document.getElementById("recordActivityToggle");
let hideViewsToggle = document.getElementById("hideViewsToggle");

recordActivityToggle.addEventListener("change", function() {
  if(this.checked) {
    console.log("updated to checked");
  } else {
    console.log("updated to unchecked");
  }
});

hideViewsToggle.addEventListener("change", function() {
  if(this.checked) {
    console.log("updated to checked");
  } else {
    console.log("updated to unchecked");
  }
});
