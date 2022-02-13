let socket = "";
let sent = {};

function createSocket() {
  socket = new WebSocket("ws://localhost:8080");
  socket.onopen = () => {
    socket.send(JSON.stringify(window.userName));
    console.log("connection made");
  };

  socket.onerror = () => {
    console.log("Oops! Something went wrong.");
  };

  socket.onclose = () => {
    console.log(`${window.userName.name} has left the building.`);
  };

  socket.onmessage = (event) => {
    if (event.data.includes("blob")) {
      sent = getId("messages").innerHTML;
      const imgHTML = `
        <div class="imageBox">
          <img class="uploadedImage" src=${event.data} alt="Image to upload">
        </div>`;

      sent += imgHTML;
    } else {
      let { text, name } = JSON.parse(event.data);
      sent = getId("messages").innerHTML;
      const messageHTML = `  
        <div class="textContainer">
          <div class="textBox">
            <div class="text">
              ${text}
              <span class="name">
                <sub>&nbsp;&nbsp; ${name}</sub>
              </span>
            </div>
          </div>
        </div>`;

      sent += messageHTML;
    }
   // addClass("messages", "hidden")
    addToId("messages", sent);
    setTimeout(setMessagesHeight, 100);
    setTimeout(scrollView, 200);
  };
}

async function setMessagesHeight() {
  const messagesRect = getId("messages").getBoundingClientRect();
  getId("messages").style.height = `${messagesRect + 600}px`;
}

function removeClass(id, _class){
  getId(id).classList.remove(_class)
}

function scrollView() {
 // removeClass("messages", "hidden")
  const element = getId("messages").children;
  const rect = element[element.length - 1];
  rect.scrollIntoView();
}

function sendSocketData(e, data) {
  socket.send(data);
  clearInput("messageText");
  e.preventDefault();
}

function sendTyping(e) {
  console.log(e);
  socket.send("Typing...");
  e.preventDefault();
}

function addClass(id, _class){
  getId(id).classList.add(_class)
}

function loadFile(e) {
  const image = URL.createObjectURL(e.target.files[0]);
  socket.send(image);
}

function getInput(id) {
  return JSON.stringify(getId(id).value);
}

function getId(id) {
  return document.getElementById(id);
}

function addChange(id, fn) {
  getId(id).addEventListener("change", fn);
}

function addClick(id, fn) {
  getId(id).addEventListener("click", fn);
}

function clearInput(id) {
  getId(id).value = "";
}

function addToId(id, add) {
  getId(id).innerHTML = add;
}

async function importPage(page) {
  try {
    const getPage = await import(`../pages/${page}.js`);
    await getPage.default();
  } catch (e) {
    console.error(e.message);
  }
}

export {
  getId,
  addToId,
  addClick,
  importPage,
  getInput,
  clearInput,
  sendSocketData,
  createSocket,
  addChange,
  loadFile,
  sendTyping,
};
