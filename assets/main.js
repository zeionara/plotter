let toolPaneSwitcher = document.getElementById("toolpane-visibility-switcher")

async function logVisibility() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.sync.get(`isToolpaneVisibilityEnabledOnTab${tab.id}`, ({ isToolpaneVisibilityEnabled }) => {
        console.log(isToolpaneVisibilityEnabledOnTab)
    })
    // return function() {
    //    console.log(message)
    // }
}
document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.get(`isToolpaneVisibilityEnabledOnTab${tab.id}`, ({ isToolpaneVisibilityEnabled }) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: logVisibility,
        });
        if (isToolpaneVisibilityEnabled || isToolpaneVisibilityEnabled === null) {
            toolPaneSwitcher.checked = true
        } else {
            toolPaneSwitcher.checked = false
        }
    });
});

toolPaneSwitcher.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let isToolpaneVisibilityEnabled = toolPaneSwitcher.checked
  let key = `isToolpaneVisibilityEnabledOnTab${tab.id}`

  chrome.storage.sync.set({ isToolpaneVisibilityEnabled });
  chrome.storage.sync.set({ key: isToolpaneVisibilityEnabled })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: switchToolpaneVisibility,
  });
});

function switchToolpaneVisibility()
{
  let pane = document.getElementsByClassName('dcg-overgraph-pillbox-elements')[0]
  console.log('test')
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
