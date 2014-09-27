tabs = {};

chrome.tabs.onUpdated.addListener(function(id, info, tab){
    chrome.pageAction.show(tab.id);
    if (tabs[tab.id]){
        chrome.pageAction.trigger('click');
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    var tabId = tab.id;
    console.log(tabs);
    if (tabs[tabId]){
        if (!tabs[tabId].state) {
            tabs[tabId].state = true;
            chrome.tabs.executeScript(null,{file: "js/on.js"});
            chrome.tabs.executeScript({code: "runOn();"});
        } else {
            tabs[tabId].state = false;
            chrome.tabs.executeScript(null,{file: "js/off.js"});
            chrome.tabs.executeScript({code: "runOff();"});
        }
    } else {
        tabs[tabId] = {};
        tabs[tabId].state = true;
        chrome.tabs.executeScript(null,{file: "js/on.js"});
        chrome.tabs.executeScript({code: "runOn();"});
        chrome.tabs.getSelected(null,function(tab) {
            tabs[tabId].url = tab.url;
        });
    }
    chrome.pageAction.setIcon({tabId: tab.id, path:"images/icon19-" + tabs[tabId].state + ".png"});
});