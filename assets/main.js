// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// console.log('FOO BAR')

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
  
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   });
  
//   // The body of this function will be executed as a content script inside the
//   // current page
//   function setPageBackgroundColor() {
//     console.log('clicked')
//     chrome.storage.sync.get("color", ({ color }) => {
//       document.body.style.backgroundColor = color;
//     });
//   }

let toolPaneSwitcher = document.getElementById("toolpane")
chrome.storage.sync.get("isToolpaneVisibilityEnabled", ({ isToolpaneVisibilityEnabled }) => {
  toolPaneSwitcher.checked = isToolpaneVisibilityEnabled
});

toolPaneSwitcher.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let isToolpaneVisibilityEnabled = toolPaneSwitcher.checked
  chrome.storage.sync.set({ isToolpaneVisibilityEnabled });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: switchToolpaneVisibility,
  });
});

function switchToolpaneVisibility()
{
  let pane = document.getElementsByClassName('dcg-overgraph-pillbox-elements')[0]
  if (pane) {
    chrome.storage.sync.get("isToolpaneVisibilityEnabled", ({ isToolpaneVisibilityEnabled }) => {
        if (isToolpaneVisibilityEnabled) {
            console.log('showing...');
            pane.style.visibility = 'visible'
        } else {
            console.log('hiding...');
            pane.style.visibility = 'hidden'
        }
    });
  }
}
