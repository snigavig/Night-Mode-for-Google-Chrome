var state = new Boolean;
state = false;
chrome.tabs.onUpdated.addListener(function(id, info, tab){
    chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
    if (!state){
        chrome.tabs.executeScript(null,{file: "js/on.js"});
        chrome.tabs.executeScript({code: "runOn();"});
        state = true;
    } else {
        chrome.tabs.executeScript(null,{file: "js/off.js"});
        chrome.tabs.executeScript({code: "runOff();"});
        state = false;
    }
    chrome.pageAction.setIcon({tabId: tab.id, path:"images/icon19-" + state + ".png"});
});