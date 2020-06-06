console.log("%c Background ",
        "color: white; background-color: #9CADCE",
        `Background.js Initiated`);

chrome.extension.onConnect.addListener(port => {
  port.onMessage.addListener(message => {
    console.log("%c Message ",
            "color: white; background-color: #FF7477",
            `From Popup to Background: ${message}`);
    sendMessageToPopup(port, "hello");
  });
});

const sendMessageToPopup = (port, message) => {
  console.log("%c Message ",
          "color: white; background-color: #FF7477",
          `From Background to Popup: ${message}`);
  port.postMessage(message);
}
