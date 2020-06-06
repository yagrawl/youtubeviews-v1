const PORT = chrome.extension.connect({ name: "toggles" });

let recordActivityToggle = document.getElementById("recordActivityToggle");
let hideViewsToggle = document.getElementById("hideViewsToggle");

localStorage.setItem("recordActivityToggle", "true");
localStorage.setItem("hideViewsToggle", "false");

recordActivityToggle.addEventListener("change", function() {
  localStorage.setItem("recordActivityToggle", this.checked);
  sendMessageToBackground(`recordActivityToggle:${this.checked}`);
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `recordActivityToggle: updated to ${this.checked}`);
});

hideViewsToggle.addEventListener("change", function() {
  localStorage.setItem("hideViewsToggle", this.checked);
  sendMessageToBackground(`hideViewsToggle:${this.checked}`);
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `hideViewsToggle: updated to ${this.checked}`);
});

const sendMessageToBackground = message => {
  console.log("%c Message ",
          "color: white; background-color: #FF7477",
          `From Popup to Background: ${message}`)
  PORT.postMessage(message);
}

PORT.onMessage.addListener(message => {
  console.log("%c Message ",
          "color: white; background-color: #FF7477",
          `From Background to Popup: ${message}`)
});
