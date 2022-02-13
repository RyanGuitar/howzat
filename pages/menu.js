import {
  getId,
  addToId,
  addClick,
  importPage,
  createSocket
} from '../scripts/helpers.js';

function menu() {
  const menuHTML = `
  <div id="formBox">
    <form>
      Add a User Name:
      <input id="text" type="text" required>
      Add a Mobile number:
      <input id="number" type="number" required>
      <div id="warning">Both Required</div>
      <button id="enterChat" disabled="true">Enter Chat</button>
    </form>
  </div>`

  addToId('AppContent', menuHTML);
  addClick('enterChat', getName)
  listenInput("text")
  listenInput("number")
  listenFocus("text")
  listenFocus("number")
}

function listenInput(id) {
  getId(id).addEventListener("keyup", checkInput)
}

function listenFocus(id){
  getId(id).addEventListener("focus", checkInput)
}

const valid = {
  text: false,
  number: false
}

function checkInput(e) {
  
  if(getId("text").value.length < 0 && getId("number").value.length < 0){
alert(getId("text").value.length)
  
    addToId("warning", "Both Required")
  }
  if (e.target.id == "text") {
    if (getId("text").value.length > 1) {
      valid.text = true
      if (valid.text && valid.number) {
        addToId("warning", "")
      } else {
        addToId("warning", "Now your number")
      }
    } else {
      addToId("warning", "Name too short")
      valid.text = false
    }
  }
  if (e.target.id == "number") {
    if (getId("number").value.length == 10) {
      valid.number = true
      if (valid.text && valid.number) {
        addToId("warning", "")
      } else {
        addToId("warning", "Now your Name")
      }
    } else {
      addToId("warning", "Add 10 digits")
      valid.number = false
    }
  }
  getId("enterChat").disabled = valid.text && valid.number ? false : true;
}

function getName(e) {
  if (getId('text').value && getId("number").value && getId('number').value.length == 10) {
    const user = {
      name: getId('text').value,
      tel: getId('number').value
    }
    window.userName = user
    e.preventDefault()
    importPage('chat')
  } else {
    return
  }
}

export default menu;