tabs = {};

window.executeScripts = function(tab, action){
    var tabId = tab.id;
    if (!tabs[tabId]){
        tabs[tabId] = {};
        chrome.tabs.getSelected(null,function(tab) {
            tabs[tabId].url = tab.url;
        });
    }
    action = action || !tabs[tab.id].state;

    tabs[tabId].state = action;
    chrome.tabs.executeScript({code: "gcffNightMode.turn" + (action && "on" || "off") + "();"});
    chrome.pageAction.setIcon({tabId: tab.id, path:"images/moon-19x19-" + action + ".png"});
};

chrome.tabs.onUpdated.addListener(function(id, info, tab){
    var tabId = tab.id;
    chrome.pageAction.show(tabId);
    if (tab.url && tab.url.substr(0,"chrome".length) === "chrome") {
        chrome.pageAction.hide(tabId);
    }

    if (tabs[tabId] && tabs[tabId].state && info.url && tabs[tabId].url != info.url && info.status.toUpperCase() === "LOADING") {
        var urlCur = info.url,
            urlLast = tabs[tabId].url,
            urlContainerCur = document.createElement('a'),
            urlContainerLast = document.createElement('a');

        urlContainerCur.href = urlCur;
        urlContainerLast.href = urlLast;

        var locationLast = urlContainerLast.hostname + urlContainerLast.pathname,
            locationCur = urlContainerCur.hostname + urlContainerCur.pathname;

        if (locationCur !== locationLast && tabs[tabId].state) {
            tabs[tabId].state = false;
            tabs[tabId].url = urlCur;
            window.executeScripts(tab, true);
        }
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    window.executeScripts(tab);
});