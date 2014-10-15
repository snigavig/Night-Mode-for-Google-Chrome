tabs = {};

executeScripts = function(tab, action){
    var tabId = tab.id;
    if (!tabs[tabId]){
        tabs[tabId] = {};

        chrome.tabs.getSelected(null,function(tab) {
            tabs[tabId].url = tab.url;
        });
    }
    action = action || (tabs[tab.id].state && "off" || "on");

    tabs[tabId].state = action == "on" && true || false;
    chrome.tabs.executeScript({code: action + "();"});
    chrome.pageAction.setIcon({tabId: tab.id, path:"images/icon19-" + tabs[tabId].state + ".png"});
};

chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (info.url && info.url.substr(0,"chrome".length) !== "chrome") {
        var tabId = tab.id;

        chrome.pageAction.show(tabId);

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
                window.executeScripts(tab, "on");
            }
        }
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    window.executeScripts(tab);
});