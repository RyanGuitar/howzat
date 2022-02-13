import {
  addToId,
  addClick,
  importPage,
  getId
} from './scripts/helpers.js';

const app = getId("AppContent")
window.addEventListener("load", () => {
  checkOrientation()
  const rect = app.getBoundingClientRect()
  console.log(rect.height)
  window.addEventListener("resize", () => {
    checkOrientation()
  })
})

function checkOrientation() {
  if (window.innerWidth < window.innerHeight) {
    setPortrait()
  }
  if (window.innerWidth > window.innerHeight) {
    setLandscape()
  }
}

function setPortrait() {
  app.style.width = `${window.innerWidth}px`
  app.style.maxWidth = `${600}px`
  app.style.height = `${window.innerHeight}px`
}

function setLandscape() {
  app.style.width = `${window.innerWidth}px`
  app.style.maxWidth = `${600}px`
  app.style.height = `${window.innerHeight}px`
}

const landingHTML = `
  <div id="landingBox">
    <h1>HowZat</h1>
    <p>Click to Start</p>
  </div>`;

  addToId('AppContent', landingHTML);
  addClick('landingBox', () => importPage('menu'));