import {
  getId,
  loadFile,
  addChange,
  addToId,
  addClick,
  getInput,
  sendSocketData,
  createSocket,
} from "../scripts/helpers.js";

async function chat() {
  const chatHTML = `
  <div id="chatPage">
    <div id="messages"></div>
    <div id="inputBox">
      <input autocomplete="off" type="text" name="message" id="messageText" placeholder="Message">
      <div id="uploadBox">
        <label for="chooseFile" class="clip">
          <img src="camera.png" alt="image upload" id="imageUpload" style="width:100%;height:100%;object-fit:contain">
        </label>
          <input id="chooseFile" type="file" accept="image/*" />
      </div>
        <div id="submit">
          <img src="send.png" style="width:100%;height:100%;object-fit:contain" alt="send button">
        </div>
      </div>
    </div>
  </div>`;

  addToId("AppContent", chatHTML);
  addChange("chooseFile", loadFile);
  addClick("submit", onSubmit);
  createSocket();
}

function onSubmit(e) {
  getId("messageText").removeEventListener("change", (e) =>
    sendSocketData(
      e,
      `{"text":"Typing....", "name":"${window.userName}", "time":""}`
    )
  );
  sendSocketData(
    e,
    `{"text":${getInput("messageText")}, "name":"${
      window.userName.name
    }", "time":""}`
  );
}

export default chat;
