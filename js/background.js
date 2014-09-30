tabs = {};

executeScripts = function(tab, action){
    var tabId = tab.id;
    action = action || (tabs[tab.id].state && "off" || "on");
    if (tabs[tabId]){
        tabs[tabId].state = action == "on" && true || false;
        chrome.tabs.executeScript(null, {file: "js/" + action + ".js"});
        chrome.tabs.executeScript({code: action + "();"});
        chrome.pageAction.setIcon({tabId: tab.id, path:"images/icon19-" + tabs[tabId].state + ".png"});
    }
};

chrome.tabs.onUpdated.addListener(function(id, info, tab){
    if (info.url && info.url.substr(0,"chrome".length) !== "chrome") {
        var tabId = tab.id;
        chrome.pageAction.show(tabId);

        if (tabs[tabId] && tabs[tabId].state && info.url && info.status.toUpperCase() === "LOADING") {
            var urlCur = info.url;
            var urlLast = tabs[tabId].url;
            var urlContainerCur = document.createElement('a');
            var domainCur = '';
            var domainLast = '';
            var urlContainerLast = document.createElement('a');

            urlContainerCur.href = urlCur;
            urlContainerLast.href = urlLast;
            domainLast = urlContainerLast.hostname;
            domainCur = urlContainerCur.hostname;

            if (domainCur !== domainLast) {
                window.executeScripts(tab, "on");
                tabs[tabId].url = urlCur;
            }
        }

        if (!tabs[tabId]){
            tabs[tabId] = {};
           // if (!tabs[tabId].state) tabs[tabId].state = false;
        }

        chrome.tabs.getSelected(null,function(tab) {
            tabs[tabId].url = tab.url;
        });

        chrome.pageAction.onClicked.addListener(function(tab) {
            window.executeScripts(tab);
        });
    }
});